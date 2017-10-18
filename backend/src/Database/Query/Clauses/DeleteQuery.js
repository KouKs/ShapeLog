export default class UpdateQuery {
  getSql (params) {
    return `DELETE FROM ${params.table} `
  }

  getEscapedData (params) {
    return []
  }
}
