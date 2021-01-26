import { countDown, nextInterval, workingNumber, C_MAJOR } from '../src/helpers'
const assert  = require('assert')

describe('Building chords by interval', () => {
  it('Should get the next interval.', () => {
    const interval1 = { note: 'C', octave: 4 }
    const interval2 = { note: 'E', octave: 4 }
    const index     = C_MAJOR.indexOf(interval1.note)
    const next      = nextInterval(index + 2, interval1.octave, C_MAJOR)

    assert.equal(next.note, interval2.note)
  })

  it('Should cycle to next octave', () => {
    const b     = { note: 'B', octave: 4 }
    const c     = { note: 'C', octave: 5 }
    const index = C_MAJOR.indexOf(b.note)
    const next  = nextInterval(index + 1, b.octave, C_MAJOR)

    assert.equal(next.note, c.note)
    assert.equal(next.octave, c.octave)
  })
})

describe('Loop over arrays', () => {
  it('Should handle arrays normally when index is less than length', () => {
    const arr   = [ 'a', 'b', 'c', 'd' ]
    const b     = countDown(1, arr)

    assert.equal(b, 'b')
  })

  it('Should loop over array until index is reached', () => {
    const arr   = [ 'a', 'b', 'c', 'd' ]
    const b     = countDown(5, arr)

    assert.equal(b, 'b')
  })
})

describe('Avoid generating numbers that crash the application', () => {
  it('Should prevent divide by zero', () => {
    const bad  = 0
    const good = workingNumber(bad, 1)

    assert.equal(bad + 2, good)
  })

  it('Should avoid negative numbers', () => {
    const bad  = -5
    const good = workingNumber(bad, 0)

    assert.equal(good, 5)
  })

  it('Should avoid decimals', () => {
    const pi   = 3.14
    const good = workingNumber(pi, 0)

    assert.equal(good, 3) 
  })
})
