import config from '../../../config'
import Connection from '../Connection'
import UpdateQuery from './Clauses/UpdateQuery'
import SelectQuery from './Clauses/SelectQuery'
import InsertQuery from './Clauses/InsertQuery'
import WithWhere from './Clauses/WithWhere'
import WithOrder from './Clauses/WithOrder'
import WithLimit from './Clauses/WithLimit'
import WithData from './Clauses/WithData'

export default class Builder {
  constructor (model) {
    this.model = model
    this.modelInstance = model.newInstance()
    this.connection = Connection.establish(config.database)
    this.params = {
      data: {},
      table: this.modelInstance.table,
      where: [],
      columns: '*',
      limit: {
        skip: false,
        take: false
      },
      order: {
        column: this.modelInstance.key,
        direction: 'asc'
      }
    }
  }

  select (columns) {
    this.params.columns = columns

    return this
  }

  where (clause) {
    this.params.where.push(clause)

    return this
  }

  orWhere (clause) {
    return this.where(clause)
  }

  orderBy (column, direction) {
    this.params.order = { column, direction }

    return this
  }

  skip (count) {
    this.params.limit.skip = count

    return this
  }

  take (count) {
    this.params.limit.take = count

    return this
  }

  first (callback) {
    let [sql, escapedData] = this.buildSelect()

    this.connection.query(sql, escapedData, (error, rows, fields) => {
      callback(rows.length ? this.model.newInstance().hydrate(rows.shift()) : null)
    })
  }

  get (callback) {
    let [sql, escapedData] = this.buildSelect()

    this.connection.query(sql, escapedData, (error, rows, fields) => {
      callback(rows.map((row) => {
        return this.model.newInstance().hydrate(row)
      }))
    })
  }

  update (data, callback) {
    this.params.data = data

    let [sql, escapedData] = this.buildUpdate()

    let query = this.connection.query(sql, escapedData, (error, info) => {
      if (callback !== undefined) {
        callback(error, info)
      }
    })
  }

  insert (data, callback) {
    this.params.data = data

    let [sql, escapedData] = this.buildInsert()

    let query = this.connection.query(sql, escapedData, (error, info) => {
      if (callback !== undefined) {
        this.model.find(info.insertId, callback)
      }
    })
  }

  buildSelect () {
    let query = new WithLimit(new WithOrder(new WithWhere(new SelectQuery)))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }

  buildUpdate () {
    let query = (new WithWhere(new WithData(new UpdateQuery)))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }

  buildInsert () {
    let query = (new WithData(new InsertQuery))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }
}
