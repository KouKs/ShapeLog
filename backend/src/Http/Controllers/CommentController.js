import Controller from './Controller'
import Comment from '@/Database/Models/Comment'
import CommentValidator from '@/Http/Validators/CommentValidator'

export default class CommentController extends Controller {
  /**
   * Class constructor.
   *
   * @return void
   */
  constructor () {
    super()

    this.setValidator(CommentValidator)
  }

  /**
   * Returns a collection of the resource.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  index (req, res) {
    Comment.q.then((comments) => {
      res.send(comments)
    })
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

    req.user.$relatedQuery('comments')
      .insert({
        user_id: req.user.id,
        record_id: req.body.record_id,
        text: req.body.text
      })
      .then(() => {
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
    Comment.q.where('id', req.params.comment)
      .where('user_id', req.user.id)
      .delete()
      .then((rowsCount) => {
        if (rowsCount === 0) {
          return res.status(401).send({ error: 'This action is unauthorized.' })
        }

        return res.sendStatus(202)
      })
  }
}
