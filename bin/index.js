#!/usr/bin/env node

var vnrm = require('./vnrm.js')
const chalk = require('chalk');

var help = false
var dashdash = false
var noglob = false
var args = process.argv.slice(2).filter(function(arg) {
  if (dashdash)
    return !!arg
  else if (arg === '--')
    dashdash = true
  else if (arg === '--no-glob' || arg === '-G')
    noglob = true
  else if (arg === '--glob' || arg === '-g')
    noglob = false
  else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
    help = true
  else
    return !!arg
})

if (help || args.length === 0) {
  // If they didn't ask for help, then this is not a "success"
  var log = help ? console.log : console.error
  log('')
  log(chalk.green('Usage: vnrm <path> [<path> ...]'))
  log('')
  log(chalk.green('Deletes all files and folders at "path" recursively.'))
  log('')
  log(chalk.yellow('Options:'))
  log('')
  log(chalk.yellow('  -h,    --help      Display this usage info'))
  log(chalk.yellow('  -G,    --no-glob   Do not expand glob patterns in arguments'))
  log(chalk.yellow('  -g,    --glob      Expand glob patterns in arguments (default)'))
  process.exit(help ? 0 : 1)
} else
  go(0)

function go (n) {
  if (n >= args.length)
    return
  var options = {}
  if (noglob)
    options = { glob: false }
  vnrm(args[n], options, function (er) {
    if (er)
      throw er
    go(n+1)
  })
}
