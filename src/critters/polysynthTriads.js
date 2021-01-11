import { PolySynth }  from 'tone'
import { nextInternal } from '../helpers.js'

// TODO: Make customizable.
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

// Plays a triad
const triad = (counter, modifier) => {
  const synth  = new PolySynth().toDestination()

  const octave = modifier % 3
  const detune = modifier * 50
  const first  = nextInternal(counter, octave, SCALE)
  const third  = nextInternal(SCALE.indexOf(first.note) + 2, first.octave, SCALE)
  const fifth  = nextInternal(SCALE.indexOf(third.note) + 2, third.octave, SCALE)
  const chord  = [
    `${first.note}${first.octave}`,
    `${third.note}${third.octave}`,
    `${fifth.note}${fifth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(chord, [3, 1, 2])

  return parseInt(octave) * 3
}

// Plays the first, third, then fifth of a triad
const triad135 = (counter, modifier) => {
  const synth  = new PolySynth().toDestination()

  const octave = modifier % 3
  const detune = modifier * 50
  const first  = nextInternal(counter, octave, SCALE)
  const third  = nextInternal(SCALE.indexOf(first.note) + 2, first.octave, SCALE)
  const fifth  = nextInternal(SCALE.indexOf(third.note) + 2, third.octave, SCALE)
  const chord  = [
    `${first.note}${first.octave}`,
    `${third.note}${third.octave}`,
    `${fifth.note}${fifth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1)
  synth.triggerAttackRelease(`${third.note}${third.octave}`, 1, 1)
  synth.triggerAttackRelease(`${fifth.note}${fifth.octave}`, 1, 2)

  return parseInt(octave) + 1
}

// Plays the third, fifth, then first of a triad
const triad351 = (counter, modifier) => {
  const synth  = new PolySynth().toDestination()

  const octave = modifier % 3
  const detune = modifier * 50
  const first  = nextInternal(counter, octave, SCALE)
  const third  = nextInternal(SCALE.indexOf(first.note) + 2, first.octave, SCALE)
  const fifth  = nextInternal(SCALE.indexOf(third.note) + 2, third.octave, SCALE)
  const chord  = [
    `${first.note}${first.octave}`,
    `${third.note}${third.octave}`,
    `${fifth.note}${fifth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${third.note}${third.octave}`, 1)
  synth.triggerAttackRelease(`${fifth.note}${fifth.octave}`, 1, 1)
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1, 2)

  return parseInt(octave) + 3
}

// Plays the fifth, first, then third of a triad
const triad513 = (counter, modifier) => {
  const synth  = new PolySynth().toDestination()

  const octave = modifier % 3
  const detune = modifier * 50
  const first  = nextInternal(counter, octave, SCALE)
  const third  = nextInternal(SCALE.indexOf(first.note) + 2, first.octave, SCALE)
  const fifth  = nextInternal(SCALE.indexOf(third.note) + 2, third.octave, SCALE)
  const chord  = [
    `${first.note}${first.octave}`,
    `${third.note}${third.octave}`,
    `${fifth.note}${fifth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${fifth.note}${fifth.octave}`, 1)
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1, 1)
  synth.triggerAttackRelease(`${third.note}${third.octave}`, 1, 2)

  return parseInt(octave) + 5
}

/**
 * Exports
 */
export {
  triad,
  triad135,
  triad351,
  triad513
}
