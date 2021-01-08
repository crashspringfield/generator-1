import { harmonic } from './critters.js'
import { countDown } from './helpers.js'

// Verify nonzero parameter passed from one critter to the next.
const generateSpore = previous => {
  if (!previous || previous == 0) return Math.floor(Math.random() * 100)

  return previous
}

// Create event listeners.
document.addEventListener('keydown', e => {
  if (e.keyCode > 99 || e.keyCode < 10) return

  // Spit the 2 digit key code to get our parameters.
  const a = e.keyCode.toString()[0]
  const b = e.keyCode.toString()[1]

  const fn   = countDown(spore, critters)
  const next = fn(a, b)

console.log('next', next)

  spore = generateSpore(next, spore)

console.log('spore', spore)

})

document.addEventListener('touchstart', e => {
  // Take the 1s place of X and Y coordinates to get our parameters.
  const a = e.touches[0].clientX.toString().slice(-1)
  const b = e.touches[0].clientY.toString().slice(-1)

  const fn   = countDown(spore, critters)
  const next = fn(a, b)

console.log('next', next)

  spore = generateSpore(next, spore)

console.log('spore', spore)
})

// Begin application
const critters = harmonic
let spore      = generateSpore()
