const { exec } = require('child_process')
const { resolve, basename, dirname } = require('path')

function treeWalk (dir, callback, options) {
  const ignores = options.ignores
  const name = options.name
  const step = options.step
  const results = []

  const depth = options.maxDepth + 1 // need do add 1 - tree cmd specific

  const addResult = (filename, filePath) => {
    step && step(filePath)
    results.push(filePath)
  }

  const fullDir = resolve(dir)
  const include = '-P "' + name + '"'
  const exclude = '-I "' + ignores.join('|') + '"'
  const grep = ' | grep -E "' + name + '$"'

  const cmd = `tree ${fullDir} -d -a -f -L ${depth} ${include} ${exclude} ${grep}`
  // console.log(cmd)
  exec(cmd, (err, files) => {
    if (err) {
      return callback(err)
    }

    let filesArr = files.split('\n')
    filesArr.map((f, key) => {
      let filePath = f.split(' /')[1] && '/' + f.split(' /')[1]
      if (filePath) {
        addResult(basename(filePath), dirname(filePath))
      }
    })

    callback(null, results)
  })
};

module.exports = treeWalk
