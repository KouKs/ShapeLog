import _ from 'lodash'
import RouteGroup from './RouteGroup'

export default class Route {
  static get resourceRoutes () {
    return {
      index: { method: 'get', path: '/{name}s' },
      store: { method: 'post', path: '/{name}s' },
      show: { method: 'get', path: '/{name}s/:{name}' },
      update: { method: 'put', path: '/{name}s/:{name}' },
      destroy: { method: 'delete', path: '/{name}s/:{name}' }
    }
  }

  constructor (method, path, action) {
    this.method = method
    this.path = path
    this.action = action
    this.middlewareArray = []
  }

  static get (path, action) {
    return new this('get', path, action)
  }

  static post (path, action) {
    return new this('post', path, action)
  }

  static put (path, action) {
    return new this('put', path, action)
  }

  static delete (path, action) {
    return new this('delete', path, action)
  }

  static resource (path, action) {
    let routes = []

    for (let name in this.resourceRoutes) {
      let route = this.resourceRoutes[name]

      routes.push(new this(
        route.method,
        route.path.replace(/\{name\}/g, path),
        [action, name]
      ))
    }

    return routes
  }

  static group (args, callback) {
    return (new RouteGroup(args, callback)).resolve()
  }

  middleware (middleware) {
    this.middlewareArray.push(middleware)

    return this
  }

  resolve (app) {
    return app[this.method](this.path, ... this.assembleRoute())
  }

  assembleRoute () {
    let chain = this.resolveMiddleware()

    if (_.isFunction(this.action)) {
      chain.push(this.resolveClosureRoute())
    }

    if (_.isArray(this.action)) {
      chain.push(this.resolveArrayRoute())
    }

    return chain
  }

  resolveMiddleware (req, res, next) {
    let middlewareChain = []

    _.flatten(this.middlewareArray).forEach((middleware) => {
      middlewareChain.push((new middleware()).handle)
    })

    return middlewareChain
  }

  resolveClosureRoute () {
    return this.action
  }

  resolveArrayRoute() {
    let [controller, action] = this.action

    return (req, res) => {
      (new controller())[action](req, res)
    }
  }
}
