import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import GUI from 'lil-gui';
import vertexCube1 from './shader/cube1/vertex.glsl'
import fragmentCube1 from './shader/cube1/fragment.glsl'
import vertexCube2 from './shader/cube2/vertex.glsl'
import fragmentCube2 from './shader/cube2/fragment.glsl'

const choix1 = document.querySelector('.gauche')
const choix2 = document.querySelector('.droite')

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

const boxGeo = new THREE.BoxGeometry(1,1,1,512,512,512)
const boxMat1 = new THREE.ShaderMaterial({
    vertexShader: vertexCube1,
    fragmentShader : fragmentCube1,
    uniforms :{
        uTime : {value : 0},
        uTaux : {value : -0.71 },
        uColor : {value : new THREE.Vector3(0.2,0.2,0.2)},
    },transparent:true
})
const boxMat2 = new THREE.ShaderMaterial({
    vertexShader: vertexCube2,
    fragmentShader : fragmentCube2,
    uniforms :{
        uTime : {value : 0},
        uTaux : {value : -0.71 },
        uColor : {value : new THREE.Vector3(0.2,0.2,0.2)},
    }, transparent:true
})
const cube1 = new THREE.Mesh(boxGeo,boxMat1)
const cube2 = new THREE.Mesh(boxGeo,boxMat2)


const groupDroite = new THREE.Group()
const groupGauche = new THREE.Group()
groupGauche.position.x=-1
groupGauche.position.y = -0.3
groupDroite.position.x=1
groupDroite.position.y = -0.3

groupGauche.add(cube1)
groupDroite.add(cube2)

const textMat = new THREE.MeshBasicMaterial({
    color: "#ff0000",
})

const cubeExtGeo = new THREE.BoxGeometry(1.01,1.01,1.01)
const cubeExt1 = new THREE.Mesh(cubeExtGeo,textMat)
const cubeExt2 = new THREE.Mesh(cubeExtGeo,textMat)


groupDroite.add(cubeExt1)
groupGauche.add(cubeExt2)

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
    cube2.material.uniforms.uTime.value = elapsedTime

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

document.querySelector('#next').addEventListener('click',rotateCube)

function rotateCube(e){
    e.target.style.display="none"

    rotateAnimation()
    setTimeout(() => {
        cube1.material.uniforms.uColor.value = new THREE.Vector3(0.2,0.2,0.2)
        cube2.material.uniforms.uColor.value = new THREE.Vector3(0.2,0.2,0.2)

    }, 1000);
}

function rotateAnimation(){
    groupDroite.rotation.x = clock.getElapsedTime()
    groupGauche.rotation.x = clock.getElapsedTime()
    
    decrease()
    requestAnimationFrame(rotateAnimation)
}

function decrease(){
    cube1.material.uniforms.uTaux.value -= clock.getElapsedTime()*0.003;
    cube2.material.uniforms.uTaux.value -= clock.getElapsedTime()*0.003;
    console.log('tjrs');
    if(cube1.material.uniforms.uTaux.value<0 && cube2.material.uniforms.uTaux.value<0){
        
    }
}

let TauxMax =[0.0,-0.3]

choix1.addEventListener('click',choixFait)
choix1.addEventListener('click',()=>{
    cube1.material.uniforms.uColor.value = new THREE.Vector3(1.0,1.0,0.0)
})
choix2.addEventListener('click',()=>{
    cube2.material.uniforms.uColor.value = new THREE.Vector3(1.0,1.0,0.0)
})

function choixFait(){

    cube1.material.uniforms.uTaux.value += Math.min(cube1.material.uniforms.uTaux.value,TauxMax[0])-cube1.material.uniforms.uTaux.value + 0.008
    cube2.material.uniforms.uTaux.value += Math.min(cube2.material.uniforms.uTaux.value,TauxMax[1])-cube2.material.uniforms.uTaux.value + 0.008

    requestAnimationFrame(choixFait)
}

 choix2.addEventListener('click',choixFait)

 let index = Math.round(Math.random()+1);
 console.log(index);

async function fetchData(){
    const r = await fetch('http://91.165.239.186:2020/api.php?recup='+ index,{
        method: "GET",
        mode: "cors",
        credentials:"omit"

    })
    if(r.ok===true){
        
        return r.json();
    }
 }

fetchData().then(users=>console.log(JSON.stringify(users)))