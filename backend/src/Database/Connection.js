import Mysql from 'mysql'

export default class Connection {
  static establish (config) {
    const connection = Mysql.createConnection(config)

    connection.connect()

    return connection
  }
}
