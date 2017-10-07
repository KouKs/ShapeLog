import _ from 'lodash'
import Route from './Route'

export default class Kernel {
  static boot (app) {
    this.resolveRoutes(app)
  }

  static registerRoutes () {
    return require('../routes').default
  }

  static resolveRoutes (app) {
    _.flatten(this.registerRoutes()).forEach(route => route.resolve(app))
  }
}
