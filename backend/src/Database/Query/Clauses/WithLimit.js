import QueryDecorator from './QueryDecorator'

export default class WithLimit extends QueryDecorator {
  getSql (params) {
    if (params.limit.skip === false && params.limit.take === false) {
      return this.query.getSql(params)
    }

    return this.query.getSql(params) + this.build(params)
  }

  build (params) {
    return `LIMIT ${params.limit.skip}, ${params.limit.take}`
  }
}
