const hasTreeCommand = require('./hasTreeCommand')
const treeWalk = require('./treeWalk')
const nodeWalk = require('./nodeWalk')

const defaultOptions = {
  name: '.git',
  step: undefined,
  maxDepth: 6,
  ignores: ['node_modules', 'bower_components', 'vendor'],
  forceNode: false
}

function formatOutput (input, name) {
  const req = new RegExp('/' + name, 'g')
  return input.map(d => d.replace(req, '')).sort()
}

/**
 * @param {string} dir
 * @param {function} callback
 * @param {{ignores?: string[], step?: function, name?: string, maxDepth?: number, forceNode?: bool}} options
 * @return {string[]}
 */
function gitDirsSearch (dir, callback, options) {
  const opts = Object.assign({}, defaultOptions, options)

  const callbackWrapper = (error, data) => {
    data = error ? null : formatOutput(data, opts.name)
    callback(error, data)
  }
  hasTreeCommand((exists) => {
    if (exists && opts.forceNode !== true) {
      treeWalk(dir, callbackWrapper, opts)
    } else {
      nodeWalk(dir, callbackWrapper, opts)
    }
  })
}

module.exports = gitDirsSearch
