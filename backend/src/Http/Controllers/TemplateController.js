import Controller from './Controller'
import Template from '@/Database/Models/Template'
import TemplateRow from '@/Database/Models/TemplateRow'
import TemplateValidator from '@/Http/Validators/TemplateValidator'

export default class TemplateController extends Controller {
  /**
   * Class constructor.
   *
   * @return void
   */
  constructor () {
    super()

    this.setValidator(TemplateValidator)
  }

  /**
   * Returns a collection of the resource.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  index (req, res) {
    req.user.templates.get()
      .then((templates) => res.send(templates))
  }

  /**
   * Stores a newly created record in the storage.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  store (req, res) {
    if (!this.validate(req, res)) {
      return
    }

    Template.create({
      user_id: req.user.id,
      name: req.body.name,
      text: req.body.text,
      background: req.body.background
    }).then((template) => {
      req.body.rows.forEach((row) => {
        TemplateRow.create({
          template_id: template.id,
          type: row.type,
          data: JSON.stringify(row.data)
        })
      })

      res.sendStatus(201)
    })
  }

  /**
   * Shows a single record of the resource.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  show (req, res) {
    //
  }

  /**
   * Updates a given resource in the storage.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  update (req, res) {
    if (!this.validate(req, res)) {
      return
    }

    Template.find(req.params.template)
      .then((template) => {
        if (req.user.id !== template.user_id) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        template.update({
          name: req.body.name,
          text: req.body.text,
          background: req.body.background
        })

        return template.rows.delete()
      })
      .then(() => {
        req.body.rows.forEach((row) => {
          TemplateRow.create({
            template_id: req.params.template,
            type: row.type,
            data: JSON.stringify(row.data)
          })
        })

        res.sendStatus(202)
      })
  }

  /**
   * Removes a record from the storage.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  destroy (req, res) {
    Template.find(req.params.template)
      .then((template) => {
        if (req.user.id !== template.user_id) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        return template.delete()
      })
      .then(() => {
        res.sendStatus(202)
      })
  }

  /**
   * Loads all rows for templates.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  rows (req, res) {
    req.user.templates.select('template_rows.*')
      .join('template_rows', 'templates.id = template_rows.template_id')
      .orderBy('template_rows.id', 'desc')
      .get().then((rows) => {
        res.send(rows)
      })
  }
}
