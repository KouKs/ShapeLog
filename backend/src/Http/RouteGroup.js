import _ from 'lodash'

export default class Route {
  constructor (args, callback) {
    this.args = args
    this.callback = callback
  }

  resolve () {
    return _.flatten(this.callback()).map((route) => {
      if (this.args.prefix !== undefined) {
        route.path = `/${this.trimSlashes(this.args.prefix)}/${this.trimSlashes(route.path)}`
      }
      
      if (this.args.middleware !== undefined) {
        route.middleware(this.args.middleware)
      }

      return route
    })
  }

  trimSlashes(str) {
    return str.replace(/^\/?(.+)\/?$/, '$1')
  }
}
