import * as THREE from 'three'
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

//debug
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/5.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

//geometry
const sphere = new THREE.SphereGeometry(0.5,64,64)
const plane = new THREE.PlaneGeometry(1,1,100,100);
const torus = new THREE.TorusGeometry(0.3,0.2,64,128);

// // MeshBasicMaterial
// const materials = new THREE.MeshBasicMaterial()
// materials.map = doorColorTexture
// // materials.color = new THREE.Color('green')
// // materials.transparent = true
// // // materials.opacity = 0.5
// // materials.alphaMap = doorAlphaTexture
// // materials.side = THREE.DoubleSide

//MeshNormalMaterial
// const materials = new THREE.MeshNormalMaterial()

//MeshMatcapMaterial
// const materials = new THREE.MeshMatcapMaterial()
// materials.matcap = matcapTexture

//MeshLambertMaterial
// const materials = new THREE.MeshLambertMaterial()

//MeshPhongMaterial
// const materials = new THREE.MeshPhongMaterial()
// materials.shininess = 100;
// materials.specular = new THREE.Color(0x1188f)

//MeshToonMaterial
// const materials = new THREE.MeshToonMaterial()
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// materials.gradientMap = gradientTexture

//MeshStandardMaterial
// const materials = new THREE.MeshStandardMaterial();
// materials.metalness = 1
// materials.roughness = 1
// materials.map = doorColorTexture;
// materials.aoMap = doorAmbientOcclusionTexture 
// materials.aoMapIntensity = 1
// materials.displacementMap = doorHeightTexture
// materials.displacementScale = 0.1
// materials.metalnessMap = doorMetalnessTexture
// materials.roughnessMap = doorRoughnessTexture
// materials.normalMap = doorNormalTexture
// materials.transparent = true
// materials.alphaMap = doorAlphaTexture

// gui.add(materials,"metalness").min(0).max(1).step(0.0001)
// gui.add(materials,"roughness").min(0).max(1).step(0.0001)


/*
 MeshPhysicalMaterial
*/
const materials = new THREE.MeshPhysicalMaterial();;
materials.metalness = 0
materials.roughness = 0
// materials.map = doorColorTexture;
// materials.aoMap = doorAmbientOcclusionTexture 
// materials.aoMapIntensity = 1
// materials.displacementMap = doorHeightTexture
// materials.displacementScale = 0.1
// materials.metalnessMap = doorMetalnessTexture
// materials.roughnessMap = doorRoughnessTexture
// materials.normalMap = doorNormalTexture
// materials.transparent = true
// materials.alphaMap = doorAlphaTexture

gui.add(materials,"metalness").min(0).max(1).step(0.0001)
gui.add(materials,"roughness").min(0).max(1).step(0.0001)

//clearcoat...
// materials.clearcoat = 1
// materials.clearcoatRoughness = 0;

// gui.add(materials, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(materials, 'clearcoatRoughness').min(0).max(1).step(0.0001)

//Sheen
// materials.sheen = 1
// materials.sheenRoughness = 0.25
// materials.sheenColor.set(1,1,1)

// gui.add(materials,'sheen').min(0).max(1).step(0.0001)
// gui.add(materials,'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(materials,'sheenColor')

//Iridescence
// materials.iridescence = 1
// materials.iridescenceIOR =1
// materials.iridescenceThicknessRange = [100,800]

// gui.add(materials,'iridescence').min(0).max(1).step(0.0001)
// gui.add(materials,'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(materials.iridescenceThicknessRange,'0').min(1).max(1000).step(1)
// gui.add(materials.iridescenceThicknessRange,'1').min(1).max(1000).step(1)

//Transmission
materials.transmission = 1
materials.ior = 1.5
materials.thickness = 0.5

gui.add(materials,'transmission').min(0).max(1).step(0.0001)
gui.add(materials,'ior').min(1).max(10).step(0.0001)
gui.add(materials,'thickness').min(0).max(1).step(0.0001)

// const ambientLight = new THREE.AmbientLight('white',1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('white', 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

//environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr',(environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
})

//meshes
const sphereMesh = new THREE.Mesh(sphere, materials)
const cubeMesh = new THREE.Mesh(plane, materials)
const torusMesh = new THREE.Mesh(torus, materials)

sphereMesh.position.x = -1.5
torusMesh.position.x = 1.5

// Add meshes to the scene
scene.add(sphereMesh,cubeMesh,torusMesh)


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
camera.position.z = 2
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

    sphereMesh.rotation.y = 0.1 * elapsedTime;
    cubeMesh.rotation.y = 0.1 * elapsedTime;
    torusMesh.rotation.y = 0.1 * elapsedTime;
    
    sphereMesh.rotation.x = -0.15 * elapsedTime;
    cubeMesh.rotation.x = -0.15 * elapsedTime;
    torusMesh.rotation.x = -0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()