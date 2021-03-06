import { FeedbackDelay, MembraneSynth, MonoSynth, PingPongDelay, PolySynth } from 'tone'
import { countDown, nextInterval, C_MAJOR, WAVEFORMS } from '../helpers.js'
import { updateCritter } from '../animations'

// MebraneSynth with feedback delay
const drop = (octaves, modifier) => {
  const count = modifier % 2 ? 8 : 4
  const first = nextInterval(octaves, 2, C_MAJOR)
  const delay = new FeedbackDelay(`${count}n`, parseFloat(`0.${octaves + modifier}`)).toDestination()
  const drum  = new MembraneSynth({
  	octaves:    octaves,
  	pitchDecay: 0.1
  }).connect(delay)

  const chaos = updateCritter(modifier, octaves)
  drum.triggerAttackRelease(`${first.note}${first.octave}`, `${count * 4}n`)

  setTimeout(() => { drum.dispose() }, 5000)

  return Math.abs(chaos - modifier)
}

// MonoSynth that fades into pitch
const fadeIn = (counter, modifier) => {
  const octave = counter > 5 ? 3 : 4
  const first  = nextInterval(counter, octave, C_MAJOR)
  const wave   = countDown(C_MAJOR.indexOf(first.note), WAVEFORMS)
  const synth  = new MonoSynth({
  	oscillator: {
  		type: wave
  	},
  	envelope: {
  		attack: 1,
      release: parseInt(`0.${octave}`)
  	}
  }).toDestination()

  const chaos = updateCritter(counter, modifier)

  synth.triggerAttackRelease(`${first.note}${first.octave}`)

  console.log(`MonoSynth: ${first.note}${first.octave} with ${wave} wave and release of 0.${octave}`)

  setTimeout(() => { synth.dispose()}, 5000)

  return Math.abs(chaos - modifier)
}

// Polysynth with PingPongDelay time and chord set by input.
const intervalDelay = (counter, modifier) => {
  const pingPong = new PingPongDelay(parseFloat(`0.${counter}`), parseFloat(`0.${modifier}`)).toDestination()
  const synth    = new PolySynth().connect(pingPong).toDestination()

  const octave = counter > 5 ? 3 : 4
  const first  = nextInterval(counter, octave, C_MAJOR)
  const third  = nextInterval(C_MAJOR.indexOf(first.note) + 2, first.octave, C_MAJOR)
  const fifth  = nextInterval(C_MAJOR.indexOf(third.note) + 2, third.octave, C_MAJOR)
  const chord  = [
    `${first.note}${first.octave}`,
    `${third.note}${third.octave}`,
    `${fifth.note}${fifth.octave}`
  ]

  const chaos = updateCritter(counter, modifier)

  synth.triggerAttackRelease([ `${first.note}${first.octave}`, `${third.note}${third.octave}` ], 1)
  synth.triggerAttackRelease([`${third.note}${third.octave}`, `${fifth.note}${fifth.octave}`], 1, parseFloat(`0.${octave}`), 0.7)

  console.log(`PolySynth - delay: ${chord.join(' ')}, delay: 0.${counter} 0.${modifier}`)

  setTimeout(() => { synth.dispose()}, 5000)

  return Math.abs(chaos - modifier)
}

export {
  drop,
  fadeIn,
  intervalDelay
}
