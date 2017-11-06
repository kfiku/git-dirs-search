const { stat, readdir } = require('fs')
const { resolve, dirname } = require('path')

/**
 * @param {string} dir
 * @param {function} callback
 * @param {{ignores: string[], step: function, name: string, maxDepth: number}} options
 */
function nodeWalk (dir, callback, options, depth) {
  const ignores = options.ignores
  const name = options.name
  const step = options.step

  let results = []
  let pending

  depth = depth === undefined ? options.maxDepth : depth

  const addResult = (filename, filePath) => {
    if (!name || filename === name) {
      step && step(filePath)
      results.push(filePath)
    }
  }

  readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }

    pending = list.length

    if (!pending) {
      return callback(null, results)
    }

    list.forEach((filename) => {
      let filePath = resolve(dir, filename)

      if (ignores.indexOf(filename) > -1) {
        if (!--pending) {
          callback(null, results)
        }
      } else {
        addResult(filename, dirname(filePath))

        if (depth === 0) {
          if (!--pending) {
            callback(null, results)
          }
        } else {
          stat(filePath, (err2, stat) => {
            if (stat && stat.isDirectory()) {
              const nextCallback = (err3, res) => {
                results = results.concat(res)
                if (!--pending) {
                  callback(null, results)
                }
              }
              nodeWalk(filePath, nextCallback, options, depth - 1)
            } else {
              // console.log(filename, name);
              addResult(filename, dirname(filePath))

              if (!--pending) {
                callback(null, results)
              }
            }
          })
        }
      }
    })
  })
}

module.exports = nodeWalk
