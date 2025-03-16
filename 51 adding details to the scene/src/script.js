import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import fireFliesVertexShader from './shaders/fireflies/vertex.glsl'
import fireFliesFragmentShader from './shaders/fireflies/fragment.glsl'
import portalVertextShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('bakedFinal.jpg')
bakedTexture.colorSpace = THREE.SRGBColorSpace
bakedTexture.flipY = false

/**
 * Materials
 */
//Baked Material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })


//Portal Light Material
debugObject.portalColorStart = 'df62db'
debugObject.portalColorEnd = '8e48a8'


gui.addColor(debugObject, 'portalColorStart').onChange(()=> portalLightMaterial.uniforms.uColorStart.value.set(debugObject.portalColorStart))
gui.addColor(debugObject, 'portalColorEnd').onChange(()=> portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd))

const portalLightMaterial = new THREE.ShaderMaterial({ 
    uniforms:{
        uTime: {value: 0},
        uColorStart: {value: new THREE.Color(0xdf62db)},
        uColorEnd: {value: new THREE.Color(0x8e48a8)}
    },
    vertexShader: portalVertextShader,
    fragmentShader: portalFragmentShader,
 })

//pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

/**
 * Model
 */
gltfLoader.load(
    'portalFinal2.glb',
    (gltf)=>{
        const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')

        bakedMesh.material = bakedMaterial

        const poleLightAMesh = gltf.scene.children.find(child => child.name === 'poleLightA')
        const poleLightBMesh = gltf.scene.children.find(child => child.name === 'poleLightB')
        const portalLightMesh = gltf.scene.children.find(child => child.name === 'portal')

        poleLightAMesh.material = poleLightMaterial
        poleLightBMesh.material = poleLightMaterial
        portalLightMesh.material = portalLightMaterial

        scene.add(gltf.scene)
    }
)

/**
 * Fireflies
 */
//Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for(let i = 0; i< firefliesCount; i++){
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
    positionArray[i * 3 + 1] = Math.random() * 1.5
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

    //Scale
    scaleArray[i] = Math.random()
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

//Material
const fireFliesMaterial = new THREE.ShaderMaterial({
    uniforms:{
        uTime: {value: 0},
        uPixelRatio: {value: Math.min(window.devicePixelRatio, 2)},
        uSize: {value: 100}
    },
    vertexShader: fireFliesVertexShader,
    fragmentShader: fireFliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
})

gui.add(fireFliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('Fireflies size')

//Points
const fireFlies = new THREE.Points(firefliesGeometry, fireFliesMaterial)
scene.add(fireFlies)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
    
    //update Fireflies
    fireFliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#322430'
renderer.setClearColor(debugObject.clearColor)
gui.addColor(debugObject, 'clearColor').onChange(()=> renderer.setClearColor(debugObject.clearColor))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    fireFliesMaterial.uniforms.uTime.value = elapsedTime
    portalLightMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()