const { exec } = require('child_process')

let isTree // = false; // FORCE NODE IMPLEMENTATION

function hasTreeCommand (callback) {
  if (isTree === undefined) {
    exec('which tree', err => {
      isTree = !err
      callback(isTree)
    })
  } else {
    callback(isTree)
  }
}

module.exports = hasTreeCommand
