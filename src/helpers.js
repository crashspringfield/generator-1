/**
 * Iterate over an array until the index is found. If the index is greater
 * than the length of the array, start over.
 *
 * Basically, arr[i] where i > arr.length.
 */
const countDown = (index, array) => {
  if (index < array.length) {
    return array[index]
  }

  return countDown(index - array.length, array)
}

/**
 * Generates the next interval of a chord.
 *
 * {@param} - index  - Index of note in scale.
 * {@param} - octave - Current octave w/in scale.
 * {@param} - scale  - Array of notes that make up scale.
 */
const nextInternal = (index, octave, scale) => {
  if (index < scale.length) {
    return { note: scale[index], octave: octave }
  }

  return nextInternal(index - scale.length, parseInt(octave) + 1, scale)
}

/**
 * Make sure each function gets a working number that won't crash
 */
const workingNumber = (val, greaterThan) => {
  const int = Math.floor(parseInt(val))

  return int > greaterThan ? int : int + 2
}

export {
  countDown,
  nextInternal,
  workingNumber
}
