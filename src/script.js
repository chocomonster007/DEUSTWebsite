import * as THREE from 'three'
import vertexCube1 from './shader/cube1/vertex.glsl'
import fragmentCube1 from './shader/cube1/fragment.glsl'
import vertexCube2 from './shader/cube2/vertex.glsl'
import fragmentCube2 from './shader/cube2/fragment.glsl'

const choix1 = document.querySelector('.gauche')
const choix2 = document.querySelector('.droite')

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

const cubeExtMat = new THREE.MeshStandardMaterial({
    color:0xffffff,
    transparent : true,
    opacity: 0.2,
    roughness: 0.2,
    metalness :1
})

const cubeExtGeo = new THREE.BoxGeometry(1.01,1.01,1.01)
const cubeExt1 = new THREE.Mesh(cubeExtGeo,cubeExtMat)
const cubeExt2 = new THREE.Mesh(cubeExtGeo,cubeExtMat)

cubeExt1.receiveShadow = true
cubeExt2.receiveShadow = true

groupDroite.add(cubeExt1)
groupGauche.add(cubeExt2)

const directionalLight = new THREE.DirectionalLight( 0xffede6, 58 );
scene.add( directionalLight );
directionalLight.position.z = 3
directionalLight.position.x = 1


const helper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(helper)

scene.add(groupGauche)
scene.add(groupDroite)
const clock = new THREE.Clock()

//Animation 
function tick(){
    const elapsedTime = clock.getElapsedTime()
    cube1.material.uniforms.uTime.value = elapsedTime
    cube2.material.uniforms.uTime.value = elapsedTime

    renderer.render(scene, camera)

    controls.update()

    window.requestAnimationFrame(tick)
}

tick()

let clockBis
function rotateCube(e){
    e.target.style.display="none"
    clockBis = new THREE.Clock()

    rotateAnimation()
    setTimeout(() => {
        cube1.material.uniforms.uColor.value = new THREE.Vector3(0.2,0.2,0.2)
        cube2.material.uniforms.uColor.value = new THREE.Vector3(0.2,0.2,0.2)

    }, 1000);
}


function rotateAnimation(){
    groupDroite.rotation.x = clockBis.getElapsedTime()*3
    groupGauche.rotation.x = clockBis.getElapsedTime()*3
    decrease()
    requestAnimationFrame(rotateAnimation)
}

function decrease(){
    cube1.material.uniforms.uTaux.value -= clockBis.getElapsedTime()*0.03;
    cube2.material.uniforms.uTaux.value -= clockBis.getElapsedTime()*0.03;
    console.log('tjrs');

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
    document.querySelector('#next').style.display = 'block'
    choix1.style.display='none'
    choix2.style.display='none'
document.querySelector('#next').addEventListener('click',rotateCube)
remplissageCube()
    
}

function remplissageCube(){

    cube1.material.uniforms.uTaux.value += Math.min(cube1.material.uniforms.uTaux.value,TauxMax[0])-cube1.material.uniforms.uTaux.value + 0.008
    cube2.material.uniforms.uTaux.value += Math.min(cube2.material.uniforms.uTaux.value,TauxMax[1])-cube2.material.uniforms.uTaux.value + 0.008

    requestAnimationFrame(remplissageCube)
}

 choix2.addEventListener('click',choixFait)

 let index = Math.round(Math.random()+1);
 console.log(index);

async function fetchQuestion(index){
    const r = await fetch('http://91.165.239.186:2020/api.php?recup='+ index,{
        method: "GET",
        mode: "cors",
        credentials:"omit"

    })
    if(r.ok===true){
        
        return await r.json();
    }
 }
fetchQuestion(index)