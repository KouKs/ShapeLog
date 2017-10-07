import QueryDecorator from './QueryDecorator'

export default class WithData extends QueryDecorator {
  getSql (params) {
    return this.query.getSql(params) + this.build(params)
  }

  getEscapedData (params) {
    let data = this.query.getEscapedData()
    data.push(params.data)

    return data
  }

  build (params) {
    return 'SET ? '
  }
}
