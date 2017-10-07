import multer from 'multer'

export default class FileUpload {
  handle (req, res, next) {
    return multer().array
  }
}
