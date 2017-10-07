module.exports = class Kernel {
  static boot (args) {
    this.commands = {}

    this.resolveCommands()

    this.callCommand(
      this.getCommandName(args),
      this.getArgsForCommand(args)
    )
  }

  static resolveCommands () {
    this.registerCommands().forEach((command) => {
      let [name, action] = command.resolve()

      this.commands[name] = action
    })
  }

  static registerCommands () {
    return require('./commands')
  }

  static callCommand (name, args) {
    return this.commands[name](... args)
  }

  static getCommandName (args) {
    return args[2]
  }

  static getArgsForCommand (args) {
    return args.slice(3, args.length)
  }
}
