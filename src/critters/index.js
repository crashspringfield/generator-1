import { AMSynth } from 'tone'
import { triad, triad135, triad351, triad513 } from './polysynthTriads.js'
import { fourth, fourth14, fourth41 } from './polysynthFourths.js'
import { drop, fadeIn, intervalDelay } from './snowday.js'

const SCALE = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ]

/**
 * Critters
 *
 * Wrapper functions around Tone.js Classes.
 * Each critter takes two numbers as paramaters and returns a single number.
 *
 * While not entirely pure (they may reference external sources and modify sound IO),
 * the goal is for them not to manipulate application state, instead returning a variable.
 */

const am1 = (octave, length) => {
  length = length == 0 ? 1 : length // prevent divide-by-zero

  const synth = new AMSynth().toDestination()
  const note  = octave % 2 === 0 ? 'A' : 'C'

  console.log(`AMSynth1 - octave: ${octave}, length: ${length}`)
  synth.triggerAttackRelease(`${note}${octave}`, length / 4)

  return Math.floor(octave / length) * 1
}

const am2 = (octave, length) => {
  length = length == 0 ? 1 : length // prevent divide-by-zero

  const synth = new AMSynth().toDestination()
  const note  = octave % 2 === 0 ? 'B' : 'D'

  console.log(`AMSynth2 - octave: ${octave}, length: ${length}`)
  synth.triggerAttackRelease(`${note}${octave}`, length / 6)

  return Math.floor(octave / length) * 2
}

const am3 = (octave, length) => {
  length = length == 0 ? 1 : length // prevent divide-by-zero

  const synth = new AMSynth().toDestination()
  const note  = octave % 2 === 0 ? 'E' : 'F'

  console.log(`AMSynth3 - octave: ${octave}, length: ${length}`)
  synth.triggerAttackRelease(`${note}${octave}`, length / 2)

  return Math.floor(octave / length) * 3
}

/**
 * Packs
 *
 * Critters can be mixed/matched in different packs for different musical effects.
 */
const harmonic = [
  triad, triad135, triad351, triad513, fourth, fourth14, fourth41, am1, am2, am3
]

const snowday = [
  drop, fadeIn, intervalDelay, triad, fourth
]

/**
 * Exports
 */
export {
  harmonic,
  snowday
}
