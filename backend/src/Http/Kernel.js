import _ from 'lodash'

export default class Kernel {
  static get defaultMiddleware () {
    return [
      //
    ]
  }

  static boot (app) {
    this.resolveRoutes(app)
  }

  static registerRoutes () {
    return require('../routes').default
  }

  static resolveRoutes (app) {
    _.flatten(this.registerRoutes()).forEach((route) => {
      route.middleware(this.defaultMiddleware)

      route.resolve(app)
    })
  }
}
