const fs = require('fs')
const path = require('path');
const colors = require('colors');
const Command = require('./Command')


module.exports = [

  /*
  |
  | All console commands are handled here.
  |
  */

  Command.make('make:controller', (name) => {
    if (name === undefined) {
      return console.error('You need to specify the controller name.'.red)
    }

    console.log('Creating a controller: ' + name)

    let controller = `./src/Http/Controllers/${name}.js`

    fs.createReadStream('./src/Console/stubs/controller.stub')
      .pipe(fs.createWriteStream(controller))

    fs.readFile(controller, 'utf8', (err, data) => {
      fs.writeFile(controller, data.replace('Sample', name.replace('Controller', '')), 'utf8', (err) => { })
    })

    console.log(`Controller ${name} was successfully created.`.green)
  }),

  Command.make('make:middleware', (name) => {
    if (name === undefined) {
      return console.error('You need to specify the middleware name.'.red)
    }

    console.log('Creating a middleware: ' + name)

    let middleware = `./src/Http/Middleware/${name}.js`

    fs.createReadStream('./src/Console/stubs/middleware.stub')
      .pipe(fs.createWriteStream(middleware))

    fs.readFile(middleware, 'utf8', (err, data) => {
      fs.writeFile(middleware, data.replace('Sample', name), 'utf8', (err) => { })
    })

    console.log(`Middleware ${name} was successfully created.`.green)
  }),

  Command.make('make:validator', (name) => {
    if (name === undefined) {
      return console.error('You need to specify the validator name.'.red)
    }

    console.log('Creating a validator: ' + name)

    let validator = `./src/Http/Validators/${name}.js`

    fs.createReadStream('./src/Console/stubs/validator.stub')
      .pipe(fs.createWriteStream(validator))

    fs.readFile(validator, 'utf8', (err, data) => {
      fs.writeFile(validator, data.replace('Sample', name.replace('Validator', '')), 'utf8', (err) => { })
    })

    console.log(`Validator ${name} was successfully created.`.green)
  })

]
