import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import earthVertexShader from './shaders/earth/vertex.glsl'
import earthFragmentShader from './shaders/earth/fragment.glsl'
import atmoshphereVertexShader from './shaders/atmoshphere/vertex.glsl'
import atmoshphereFragmentShader from './shaders/atmoshphere/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const textureLoader = new THREE.TextureLoader()

/**
 * Earth
 */
const earthParameters = {}
earthParameters.atmoshphereDayColor = "#00aaff"
earthParameters.atmoshphereTwilightColor = "#ff6600"

gui.addColor(earthParameters, "atmoshphereDayColor").onChange(()=> {
    earthMaterial.uniforms.uAtmoshpereDayColor.value.set(earthParameters.atmoshphereDayColor)
    atmoshphereMaterial.uniforms.uAtmoshpereDayColor.value.set(earthParameters.atmoshphereDayColor)
    
})
gui.addColor(earthParameters, "atmoshphereTwilightColor").onChange(()=> {
    earthMaterial.uniforms.uAtmoshpereTwilightColor.value.set(earthParameters.atmoshphereTwilightColor)    
    atmoshphereMaterial.uniforms.uAtmoshpereTwilightColor.value.set(earthParameters.atmoshphereTwilightColor)    
})

//Textures
const earthDayTexture = textureLoader.load('./earth/day.jpg')
earthDayTexture.colorSpace = THREE.SRGBColorSpace
earthDayTexture.anisotropy = 8

const earthNightTexture = textureLoader.load('./earth/night.jpg')
earthNightTexture.colorSpace = THREE.SRGBColorSpace
earthNightTexture.anisotropy = 8

const earthSpecularCloudsTexture = textureLoader.load('./earth/specularClouds.jpg')
earthSpecularCloudsTexture.anisotropy = 8

// Mesh
const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
const earthMaterial = new THREE.ShaderMaterial({
    vertexShader: earthVertexShader,
    fragmentShader: earthFragmentShader,
    uniforms:
    {
        uDayTexture: new THREE.Uniform(earthDayTexture),
        uNightTexture: new THREE.Uniform(earthNightTexture),
        uSpecularCloudsTexture: new THREE.Uniform(earthSpecularCloudsTexture),
        uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,1)),
        uAtmoshpereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmoshphereDayColor)),
        uAtmoshperetwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmoshphereTwilightColor)),
    }
})
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
scene.add(earth)

//Atmoshphere
const atmoshphereMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    transparent: true,
    vertexShader: atmoshphereVertexShader,
    fragmentShader: atmoshphereFragmentShader,
    uniforms:
    {
        uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,1)),
        uAtmoshpereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmoshphereDayColor)),
        uAtmoshperetwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmoshphereTwilightColor)),
    },
})
const atmoshphere = new THREE.Mesh(
    earthGeometry, atmoshphereMaterial
)
atmoshphere.scale.set(1.04, 1.04, 1.04)
scene.add(atmoshphere)

/**
 * Sun
 */
const sunSpherical = new THREE.Spherical(1, Math.PI * 0.5, 0.5)
const sunDirection = new THREE.Vector3()

//Debug
const debugSun = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial()
)
scene.add(debugSun)

//Update 
const updateSun = ()=>{
    //Sun Direction
    sunDirection.setFromSpherical(sunSpherical)         //Since sunSpherical has a radius of 1 that means sunDirections length will be 1 too means normalize.

    //Debug
    debugSun.position.copy(sunDirection).multiplyScalar(5)

    //Uniforms
    earthMaterial.uniforms.uSunDirection.value.copy(sunDirection)
    atmoshphereMaterial.uniforms.uSunDirection.value.copy(sunDirection)
}

updateSun()

//Tweaks
gui.add(sunSpherical, 'phi').min(0).max(Math.PI).onChange(updateSun)
gui.add(sunSpherical, 'theta').min(-Math.PI).max(Math.PI).onChange(updateSun)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 12
camera.position.y = 5
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)
renderer.setClearColor('#000011')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    earth.rotation.y = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()