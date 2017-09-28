/* eslint-env jest */

const { join } = require('path')
const gitDirsSearch = require('../index')

test('gitDirsSearch should be defined', () => {
  expect(gitDirsSearch).toBeDefined()
})

test('gitDirsSearch should work with default values', (done) => {
  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c',
      'd/d-a',
      'd/d-a/d-a-a/d-a-a-a'
    ]
    expect(dataRelative).toEqual(expectedData)
    done()
  })
})

test('gitDirsSearch should work with maxDepth 2', (done) => {
  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c',
      'd/d-a'
    ]
    expect(dataRelative).toEqual(expectedData)
    done()
  }, { maxDepth: 2 })
})

test('gitDirsSearch should work with maxDepth 1', (done) => {
  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c'
    ]
    expect(dataRelative).toEqual(expectedData)
    done()
  }, { maxDepth: 1 })
})

test('gitDirsSearch should work with maxDepth 1 with spep', (done) => {
  const mockStep = jest.fn()

  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c'
    ]
    expect(dataRelative).toEqual(expectedData)
    expect(mockStep.mock.calls.length).toBe(3)
    done()
  }, { maxDepth: 1, step: mockStep })
})

test('gitDirsSearch return error on wrong dir', (done) => {
  gitDirsSearch('wrongDir', (error, data) => {
    expect(error).toBeDefined()
    expect(data).toBeNull()
    done()
  })
})

/** FORCE NODE */
test('gitDirsSearch should work with default values', (done) => {
  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c',
      'd/d-a',
      'd/d-a/d-a-a/d-a-a-a'
    ]
    expect(dataRelative).toEqual(expectedData)
    done()
  }, { forceNode: true })
})

test('gitDirsSearch should work with maxDepth 2', (done) => {
  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c',
      'd/d-a'
    ]
    expect(dataRelative).toEqual(expectedData)
    done()
  }, { maxDepth: 2, forceNode: true })
})

test('gitDirsSearch should work with maxDepth 1', (done) => {
  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c'
    ]
    expect(dataRelative).toEqual(expectedData)
    done()
  }, { maxDepth: 1, forceNode: true })
})

test('gitDirsSearch should work with maxDepth 1 with spep', (done) => {
  const mockStep = jest.fn()

  gitDirsSearch(join(__dirname, 'testDir'), (error, data) => {
    expect(error).toBeNull()
    const dataRelative = data.map(d => d.split('testDir/')[1])
    const expectedData = [
      'a',
      'b',
      'c'
    ]
    expect(dataRelative).toEqual(expectedData)
    expect(mockStep.mock.calls.length).toBe(3)
    done()
  }, { maxDepth: 1, forceNode: true , step: mockStep })
})

test('gitDirsSearch return error on wrong dir', (done) => {
  gitDirsSearch('wrongDir', (error, data) => {
    expect(error).toBeDefined()
    expect(data).toBeNull()
    done()
  }, { forceNode: true })
})
