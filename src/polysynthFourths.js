import { PolySynth }  from 'tone'
import { nextInternal } from './helpers.js'

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

// Plays a 1st and 4th interval
const fourth = (counter, modifier) => {
  const octave = modifier % 4
  const detune = modifier * 100
  const synth  = new PolySynth().toDestination()
  const first  = nextInternal(counter, octave, SCALE)
  const fourth = nextInternal(SCALE.indexOf(first.note) + 3, first.octave, SCALE)
  const chord  = [
    `${first.note}${first.octave}`,
    `${fourth.note}${fourth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(chord, 2)

  return parseInt(octave) * 2
}

// Plays a 1st then 4th interval
const fourth14 = (counter, modifier) => {
  const octave = modifier % 4
  const detune = modifier * 100
  const synth  = new PolySynth().toDestination()
  const first  = nextInternal(counter, octave, SCALE)
  const fourth = nextInternal(SCALE.indexOf(first.note) + 3, first.octave, SCALE)
  const chord  = [
    `${first.note}${first.octave}`,
    `${fourth.note}${fourth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1)
  synth.triggerAttackRelease(`${fourth.note}${fourth.octave}`, 1, 1)

  return parseInt(octave) + 1
}

// Plays a 4th then 1st interval
const fourth41 = (counter, modifier) => {
  const octave = modifier % 4
  const detune = modifier * 100
  const synth  = new PolySynth().toDestination()
  const first  = nextInternal(counter, octave, SCALE)
  const fourth = nextInternal(SCALE.indexOf(first.note) + 3, first.octave, SCALE)

  const chord  = [
    `${first.note}${first.octave}`,
    `${fourth.note}${fourth.octave}`
  ]

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${fourth.note}${fourth.octave}`, 1)
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1, 1)

  return parseInt(octave) + 4
}


/**
 * Exports
 */
export {
  fourth,
  fourth14,
  fourth41
}
