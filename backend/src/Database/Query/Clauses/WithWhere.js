import _ from 'lodash'
import QueryDecorator from './QueryDecorator'

export default class WithWhere extends QueryDecorator {
  getSql (params) {
    if (params.where.length === 0) {
      return this.query.getSql(params)
    }

    return this.query.getSql(params) + this.build(params)
  }

  getEscapedData(params) {
    return this.query.getEscapedData(params).concat(_.flatten(params.where.map((where) => {
      return Object.values(where)
    })))
  }

  build (params) {
    return 'WHERE ' + params.where.map((where) => {
      let parts = Object.keys(where).map((col) => {
        return `${col} = ?`
      })

      return `( ${parts.join(' AND ')} )`
    }).join(' OR ') + ' '
  }
}
