import * as THREE from 'three'
import { countDown } from './helpers.js'

// Set up Three.js
const field    = document.getElementById('field')
const scene    = new THREE.Scene()
const camera   = new THREE.PerspectiveCamera(75, field.clientWidth / field.clientHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(field.clientWidth, field.clientHeight)
field.appendChild(renderer.domElement)

camera.position.z = 6

// Build shapes
const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
]

const points = []
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) )
}

const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
]

const dodecahedron = new THREE.DodecahedronGeometry()
const icosahedron  = new THREE.IcosahedronGeometry()
const lathe        = new THREE.LatheGeometry(points)
const octahedron   = new THREE.OctahedronGeometry()
const polyhedron   = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 6, 2)

// Array constants.
const SHAPES = [ lathe, polyhedron, octahedron, dodecahedron, icosahedron ]
const COLORS = [ '#c0f', '#5cff00', `#00e7ff`, '#00ff4c']

export function updateCritter(x, y) {
  const color    = countDown(x + y, COLORS)
  const shape    = countDown(x + y, SHAPES)
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true })
  const platonic = new THREE.Mesh(shape, material)

  scene.add(platonic)

	// TODO: Do shit better w/ scopes & state
  function animate(x,y) {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    platonic.rotation.x += parseFloat(`0.0${x}`)
    platonic.rotation.y += parseFloat(`0.0${y}`)
  }

  animate()

  setTimeout(() => { scene.remove(platonic) }, 5000)

  return x + y
}
