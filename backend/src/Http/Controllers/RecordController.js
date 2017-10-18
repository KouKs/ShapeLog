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
    Record.q.orderBy('id', 'desc').get()
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

    Record.create({
      user_id: req.user.id,
      description: req.body.description,
      background: req.body.background,
      text: req.body.text,
      template_data: JSON.stringify(req.body.template_data)
    })

    res.sendStatus(201)
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
    Record.find(req.params.record)
      .then((record) => {
        if (req.user.id !== record.user_id) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        return record.delete()
      })
      .then(() => {
        res.sendStatus(202)
      })
  }
}
