export default class UpdateQuery {
  getSql (params) {
    return `INSERT INTO ${params.table} `
  }

  getEscapedData(params) {
    return []
  }
}
