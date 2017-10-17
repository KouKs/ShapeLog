import QueryDecorator from './QueryDecorator'

export default class WithJoin extends QueryDecorator {
  getSql (params) {
    if (!params.join) {
      return this.query.getSql(params)
    }

    return this.query.getSql(params) + this.build(params)
  }

  getEscapedData (params) {
    return this.query.getEscapedData(params)
  }

  build (params) {
    return `JOIN ${params.join.table} ON ${params.join.on} `
  }
}
