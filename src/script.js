import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import GUI from 'lil-gui';

const gui = new GUI();



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const boxGeo = new THREE.BoxGeometry(1,1,1)
const boxMat = new THREE.MeshBasicMaterial({
    color:"white"
})
const cube1 = new THREE.Mesh(boxGeo,boxMat)
const cube2 = new THREE.Mesh(boxGeo,boxMat)
cube1.position.x = -1
cube2.position.x = 1
cube1.position.y = -0.3
cube2.position.y = -0.3

const groupDroite = new THREE.Group()
const groupGauche = new THREE.Group()


groupGauche.add(cube1)
groupDroite.add(cube2)

const textMat = new THREE.MeshBasicMaterial({
    color: "#ff0000"
})

const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 0.07,
		height: 0.02,
		curveSegments: 8,
		bevelEnabled: false,
		bevelThickness: 0.01,
		bevelSize: 0.001,
		bevelOffset: 0,
		bevelSegments: 5
	} );
    geometry.center()
    const meshText = new THREE.Mesh(geometry, textMat)
    meshText.position.set(-1,0,0.5)
    
    console.log(geometry.computeBoundingBox)
    groupGauche.add(meshText)
} );

scene.add(groupGauche)
scene.add(groupDroite)
const clock = new THREE.Clock()

//Animation 
function tick(){
    const elapsedTime = clock.getElapsedTime()

    groupGauche.rotation.x = elapsedTime * Math.PI 
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
    
}
tick()