import Connection from '../Connection'
import config from '../../../config'

export default class Builder {
  constructor (model) {
    this.wheres = []
    this.columns = '*'
    this.model = model
    this.modelInstance = model.newInstance()
    this.connection = Connection.establish(config.database)
    this.escapedSelectQuery = []
  }

  select (columns) {
    this.columns = columns

    return this
  }

  where (clause) {
    this.wheres.push(clause)

    return this
  }

  orWhere (clause) {
    return this.where(clause)
  }

  first (callback) {
    this.connection.query(this.buildSelectQuery(), this.escapedSelectQuery, (error, rows, fields) => {
      callback(rows.length ? this.model.newInstance().hydrate(rows.shift()) : null)
    })
  }

  get (callback) {
    this.connection.query(this.buildSelectQuery(), this.escapedSelectQuery, (error, rows, fields) => {
      callback(rows.map((row) => {
        return this.model.newInstance().hydrate(row)
      }))
    })
  }

  buildSelectQuery () {
    let sql = `SELECT ${this.columns} FROM \`${this.modelInstance.table}\``

    if (this.wheres.length > 0) {
      sql += ' WHERE ' + this.wheres.map((where) => {
        let parts = Object.keys(where).map((col) => {
          this.escapedSelectQuery.push(where[col])

          return `${col} = ?`
        })

        return `( ${parts.join(' AND ')} )`
      }).join(' OR ')
    }

    return sql
  }
}
