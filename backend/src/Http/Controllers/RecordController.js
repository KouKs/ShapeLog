import Controller from './Controller'
import Record from '@/Database/Models/Record'
import RecordValidator from '@/Http/Validators/RecordValidator'

export default class TemplateController extends Controller {
  /**
   * Class constructor.
   *
   * @return void
   */
  constructor () {
    super()

    this.setValidator(RecordValidator)
  }

  /**
   * Returns a collection of the resource.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  index (req, res) {
    Record.q.orderBy('records.id', 'desc')
      .eager('user')
      .then((records) => res.send(records))
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

    req.user.$relatedQuery('records')
      .insert({
        description: req.body.description,
        background: req.body.background,
        text: req.body.text,
        template_data: JSON.stringify(req.body.template_data)
      })
      .then(() => {
        return res.sendStatus(201)
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
    //
  }

  /**
   * Removes a record from the storage.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  destroy (req, res) {
    req.user.$relatedQuery('records')
      .where('id', req.params.record)
      .delete()
      .then((rowsCount) => {
        if (rowsCount === 0) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        return res.sendStatus(202)
      })
  }
}
