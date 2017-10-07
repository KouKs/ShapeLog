export default class QueryDecorator {
  constructor (query) {
    this.query = query
  }

  getSql (params) {
    return this.query.getSql(params)
  }

  getEscapedData(params) {
    return this.query.getEscapedData(params)
  }
}
