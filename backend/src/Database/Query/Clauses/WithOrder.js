import QueryDecorator from './QueryDecorator'

export default class WithOrder extends QueryDecorator {
  getSql (params) {
    return this.query.getSql(params) + this.build(params)
  }

  build (params) {
    return ` ORDER BY ${params.order.column} ${params.order.direction.toUpperCase()} `
  }
}
