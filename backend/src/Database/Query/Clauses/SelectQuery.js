export default class SelectQuery {
  getSql (params) {
    return `SELECT ${params.columns} FROM ${params.table} `
  }

  getEscapedData (params) {
    return []
  }
}
