import Controller from './Controller'
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
    req.user.$relatedQuery('templates').eager('rows')
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

    req.user.$relatedQuery('templates').insertGraph({
      name: req.body.name,
      text: req.body.text,
      background: req.body.background,

      rows: req.body.rows.map((row) => {
        return {
          type: row.type,
          data: JSON.stringify(row.data)
        }
      })
    }).then(() => {
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

    req.user.$relatedQuery('templates')
      .findById(req.params.template)
      .update({
        name: req.body.name,
        text: req.body.text,
        background: req.body.background
      })
      .then((rowsCount) => {
        if (rowsCount === 0) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        return TemplateRow.q.where('template_id', req.params.template)
          .delete()
      })
      .then((count) => {
        return req.body.rows.forEach((row) => {
          return TemplateRow.q.insert({
            template_id: req.params.template,
            type: row.type,
            data: JSON.stringify(row.data)
          }).then(() => {})
        })
      })
      .then(() => {
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
    req.user.$relatedQuery('templates')
      .where('id', req.params.template)
      .delete()
      .then((rowsCount) => {
        if (rowsCount === 0) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        return res.sendStatus(202)
      })
  }
}
