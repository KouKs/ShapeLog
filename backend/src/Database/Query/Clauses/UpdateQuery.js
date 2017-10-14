export default class UpdateQuery {
  getSql (params) {
    return `UPDATE ${params.table} `
  }

  getEscapedData (params) {
    return []
  }
}
