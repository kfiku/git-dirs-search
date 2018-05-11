# git-dirs-search

[![NPM version](https://badge.fury.io/js/git-dirs-search.svg)](http://badge.fury.io/js/git-dirs-search)
[![Build Status](https://travis-ci.org/kfiku/git-dirs-search.svg)](https://travis-ci.org/kfiku/git-dirs-search) [![Dependency Status](https://david-dm.org/kfiku/git-dirs-search/dev-status.svg)](https://david-dm.org/kfiku/git-dirs-search)
[![Coverage Status](https://coveralls.io/repos/github/kfiku/git-dirs-search/badge.svg?branch=master)](https://coveralls.io/github/kfiku/git-dirs-search?branch=master)


Simple module to find dirs with git repo in

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# Simple Example

```js
const gitDirsSearch require('git-dirs-search');
// or
import gitDirsSearch from 'git-dirs-search';


gitDirsSearch('/some/path/to/dir', (error, gitDirs) => {
  if(error) {
    throw error
  }

  gitDirs.map(gitDir => {
    console.log(gitDir) // log out directory path (string)
  })

  /**
   * do some think with data
   * example data = [
   *   '/some/path/to/dir/gitRepository1',
   *   '/some/path/to/dir/other/someDir',
   *   '/some/path/to/dir/other/1/2/3/someDir',
   * ]
})
```

# API

### gitDirsSearch
gitDirsSearch(dir, callback, options)

### Arguments
| Argument    | Type     | Default   | Description
| ------------| -------- | --------- | ------------------
| dir         | string   | *required | full path to dir to search repos in
| callback    | function | *required | standart node-like callback function
| options     | object   | {...}     | options object

### Options
| Option      | Key      | Default   | Description
| ------------| -------- | --------- | ------------------
| step        | function | null      | Method to be executed on single find a git repo
| maxDepth    | number   | 6         | How deep in dirs script will be searching
| ignores     | array    | ['node_modules', 'bower_components', 'vendor'] | Paths to ignore
| forceNode   | boolean  | false | By default script will use unix `tree` command if exists in of for performance. You can set this option to true, then script will always use standard node version


## Contributing

Im open to contributors :).


## Release History

#### 2017-11-09 v1.1.1
 * fix wrong options doc-block

#### 2017-11-09 v1.0.3
 * first stable version


## License

Copyright (c) 2014 Grzegorz Klimek  
Licensed under the MIT license.
