import { AutoWah, PingPongDelay, PolySynth }  from 'tone'
import { nextInterval, C_MAJOR } from '../helpers.js'
import { updateCritter } from '../animations'

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
  const octave  = modifier
  const detune  = modifier * 100
  // const autoWah = new AutoWah(50, 6, -10).toDestination()
  const synth   = new PolySynth().toDestination()
  const first   = nextInterval(counter, octave, C_MAJOR)
  const fourth  = nextInterval(C_MAJOR.indexOf(first.note) + 3, first.octave, C_MAJOR)
  const chord   = [
    `${first.note}${first.octave}`,
    `${fourth.note}${fourth.octave}`
  ]

  console.log(`PolySynth - fourth: ${chord.join(' ')}, detune: ${detune}`)

  // autoWah.Q.value = octave + 2

  const chaos = updateCritter(octave, modifier)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(chord, 1)

  setTimeout(() => { synth.dispose()}, 5000)

  return Math.abs(chaos - modifier)
}

// Plays a 1st then 4th interval
const fourth14 = (counter, modifier) => {
  const octave = modifier
  const detune = modifier * 100
  const delay  = new PingPongDelay(parseFloat(`0.${counter}`), parseFloat(`0.${modifier}`)).toDestination()
  const synth  = new PolySynth().connect(delay).toDestination()
  const first  = nextInterval(counter, octave, C_MAJOR)
  const fourth = nextInterval(C_MAJOR.indexOf(first.note) + 3, first.octave, C_MAJOR)
  const chord  = [
    `${first.note}${first.octave}`,
    `${fourth.note}${fourth.octave}`
  ]
  const chaos   = updateCritter(octave, modifier)

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1)
  synth.triggerAttackRelease(`${fourth.note}${fourth.octave}`, 1, 1)

  return chaos + 1
}

// Plays a 4th then 1st interval
const fourth41 = (counter, modifier) => {
  const octave = modifier
  const detune = modifier * 100
  const delay  = new PingPongDelay(parseFloat(`0.${counter}`), parseFloat(`0.${modifier}`)).toDestination()
  const synth  = new PolySynth().connect(delay).toDestination()
  const first  = nextInterval(counter, octave, C_MAJOR)
  const fourth = nextInterval(C_MAJOR.indexOf(first.note) + 3, first.octave, C_MAJOR)

  const chord  = [
    `${first.note}${first.octave}`,
    `${fourth.note}${fourth.octave}`
  ]

  const chaos   = updateCritter(octave, modifier)

  console.log(`PolySynth - chord: ${chord.join(' ')}, detune: ${detune}`)

  synth.set({ detune: detune })
  synth.triggerAttackRelease(`${fourth.note}${fourth.octave}`, 1)
  synth.triggerAttackRelease(`${first.note}${first.octave}`, 1, 1)

  return chaos + 4
}

/**
 * Exports
 */
export {
  fourth,
  fourth14,
  fourth41
}
