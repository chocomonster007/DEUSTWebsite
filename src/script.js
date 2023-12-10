import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import GUI from 'lil-gui';
import vertexCube from './shader/cube/vertex.glsl'
import fragmentCube from './shader/cube/fragment.glsl'
import vertexPlane from './shader/plane/vertex.glsl'
import fragmentPlane from './shader/plane/fragment.glsl'


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
const boxMat = new THREE.ShaderMaterial({
    vertexShader: vertexCube,
    fragmentShader : fragmentCube,
    transparent:true,
    uniforms :{
        uTime : {value : 0},
        uTaux : {value : 0.0 }
    }
})
const cube1 = new THREE.Mesh(boxGeo,boxMat)
const cube2 = new THREE.Mesh(boxGeo,boxMat)
console.log(cube1.material.uniforms.uTime.value)


const groupDroite = new THREE.Group()
const groupGauche = new THREE.Group()
groupGauche.position.x=-1
groupGauche.position.y = -0.3
groupDroite.position.x=1
groupDroite.position.y = -0.3

groupGauche.add(cube1)
groupDroite.add(cube2)
const planeGeo = new THREE.PlaneGeometry(1,1, 512)
const planeMat= new THREE.ShaderMaterial({
    vertexShader: vertexPlane,
    fragmentShader: fragmentPlane,
    uniforms: {
        uTime:{value:0}
    }
})
const plane = new THREE.Mesh(planeGeo, planeMat)
plane.rotation.x= -Math.PI*0.5
plane.position.y=0.3
groupGauche.add(plane)

const textMat = new THREE.MeshBasicMaterial({
    color: "#ff0000"
})

const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new TextGeometry( "Hello three.js!"
    , {
		font: font,
		size: 0.07,
		height: 0.04,
		curveSegments: 8,
		bevelEnabled: false,
		bevelThickness: 0.01,
		bevelSize: 0.001,
		bevelOffset: 0,
		bevelSegments: 5
	} );
    console.log(geometry)
    geometry.center()
    const meshText = new THREE.Mesh(geometry, textMat)
    meshText.position.set(0,0,0.5)
    
    groupGauche.add(meshText)
} );

scene.add(groupGauche)
scene.add(groupDroite)
const clock = new THREE.Clock()

//Animation 
function tick(){
    const elapsedTime = clock.getElapsedTime()
    cube1.material.uniforms.uTime.value = elapsedTime
    plane.material.uniforms.uTime.value = elapsedTime

    
    
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}
tick()

document.querySelector('#next').addEventListener('click',
    rotateCube
    
    
)

function rotateCube(e){
    e.target.style.display="none"

    rotateAnimation()
    

}
function rotateAnimation(){
    groupDroite.rotation.x += Math.PI * 0.022
    groupGauche.rotation.x += Math.PI * 0.02
    cube1.material.uniforms.uTaux.value += 0.02;

    requestAnimationFrame(rotateAnimation)
}

 