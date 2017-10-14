import _ from 'lodash'
import { trimSlashes } from '@/helpers'

export default class Route {
  constructor (args, callback) {
    this.args = args
    this.callback = callback
  }

  resolve () {
    return _.flatten(this.callback()).map((route) => {
      if (this.args.prefix !== undefined) {
        route.path = `/${trimSlashes(this.args.prefix)}/${trimSlashes(route.path)}`
      }

      if (this.args.middleware !== undefined) {
        route.middleware(this.args.middleware)
      }

      return route
    })
  }
}
