# Generator 1
Generator 1 creates sounds based on the way the user's input interacts with the existing environment.

If on a phone or tablet, tap the screen. If on a desktop, press any key.
How it works:

Each keypress or tap generates two parameters. These parameters are used to generate critters. The first critter is chosen randomly on page load.

Critters are essentially synthesizers that generate a specific sound or sequence based on the parameters passed.

After generating a sound, the critter passes a spore back to the environment, modifying the initial conditions in place when the user calls the next critter into being.


Try the [demo](https://exclusive-or.io/generative-1).

## Getting started
```
git clone https://github.com/crashspringfield/generator-1.git && cd generator-1
npm install
npx webpack
```
...and open index.html in your browser

## Expanding
Critters are pure-ish functions that wrap [Tone.js](https://tonejs.github.io) classes. Each Critter takes integer parameters to generate a sound and returns an integer. They don't manipulate application state, but it's generally easier for them to handle I/O && reference globals (like what musical key) in non-functional ways.

Fork and create your own critters in their own file under `./src`. If they follow the guide above, they should interact well with the existing environment.

## License
GPL 3.0
