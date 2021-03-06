import multer from 'multer'

export default class FileUpload {
  /**
   * Handles the incoming request.
   *
   * @param  Request  req
   * @param  Response res
   * @param  Closure  next
   * @return Closure
   */
  handle (req, res, next) {
    return multer().array
  }
}
