import config from 'config'
import WithData from './Clauses/WithData'
import WithJoin from './Clauses/WithJoin'
import WithLimit from './Clauses/WithLimit'
import WithOrder from './Clauses/WithOrder'
import WithWhere from './Clauses/WithWhere'
import Connection from '@/Database/Connection'
import DeleteQuery from './Clauses/DeleteQuery'
import InsertQuery from './Clauses/InsertQuery'
import SelectQuery from './Clauses/SelectQuery'
import UpdateQuery from './Clauses/UpdateQuery'

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
      join: false,
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

  join (table, on) {
    this.params.join = { table, on }

    return this
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

    return new Promise((resolve) => {
      this.performQuery(sql, escapedData, (results) => {
        resolve(results.length ? this.model.newInstance().hydrate(results.shift()) : null)
      })
    })
  }

  get () {
    let [sql, escapedData] = this.buildSelect()

    return new Promise((resolve) => {
      this.performQuery(sql, escapedData, (results) => {
        resolve(results.map((result) => {
          return this.model.newInstance().hydrate(result)
        }))
      })
    })
  }

  update (data) {
    this.params.data = data

    let [sql, escapedData] = this.buildUpdate()

    this.connection.query(sql, escapedData, (error, info) => {
      this.handleError(error)
    })
  }

  insert (data) {
    this.params.data = data

    let [sql, escapedData] = this.buildInsert()

    return new Promise((resolve) => {
      this.performQuery(sql, escapedData, (results) => {
        resolve(this.model.find(results.insertId))
      })
    })
  }

  delete () {
    let [sql, escapedData] = this.buildDelete()

    return new Promise((resolve) => {
      this.performQuery(sql, escapedData, (results) => {
        resolve(results)
      })
    })
  }

  buildSelect () {
    let query = new WithLimit(new WithOrder(new WithWhere(new WithJoin(new SelectQuery()))))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }

  buildUpdate () {
    let query = (new WithWhere(new WithData(new UpdateQuery())))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }

  buildInsert () {
    let query = (new WithData(new InsertQuery()))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }

  buildDelete () {
    let query = (new WithWhere(new DeleteQuery()))

    return [query.getSql(this.params), query.getEscapedData(this.params)]
  }

  performQuery (sql, escapedData, callback) {
    this.connection.query(sql, escapedData, (error, results) => {
      this.handleError(error)

      callback(results)
    })
  }

  handleError (error) {
    if (error) {
      throw error
    }
  }
}
