import _ from 'lodash'
import SetHeaders from '@/Http/Middleware/SetHeaders'

export default class Kernel {
  static get defaultMiddleware () {
    return [
      SetHeaders
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
