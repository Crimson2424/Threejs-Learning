import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

//Textures
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = ()=>{
    console.log("Loading started");
}

loadingManager.onProgress = ()=>{
    console.log("Loading in progress");
}

loadingManager.onLoad = ()=>{
    console.log("Loading completed");
}

loadingManager.onError = (error)=>{
    console.error("Error loading", error);
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTextures = textureLoader.load('./textures/minecraft.png');
const alphaTextures = textureLoader.load('./textures/door/alpha.jpg');
const heightTextures = textureLoader.load('./textures/door/height.jpg');
const normalTextures = textureLoader.load('./textures/door/normal.jpg');
const ambientOcclusionTextures = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const metalnessTextures = textureLoader.load('./textures/door/metalness.jpg');
const roughnessTextures = textureLoader.load('./textures/door/roughness.jpg');

// colorTextures.repeat.x = 2;
// colorTextures.repeat.y = 3;
// colorTextures.wrapS = THREE.RepeatWrapping;
// colorTextures.wrapT = THREE.RepeatWrapping;

// colorTextures.rotation = 1
// colorTextures.center.x = 0.5;
// colorTextures.center.y = 0.5;

// colorTextures.minFilter = THREE.NearestFilter;
colorTextures.magFilter = THREE.NearestFilter;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTextures })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()