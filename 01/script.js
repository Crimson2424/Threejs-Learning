import * as THREE from 'three';
const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

//object
const geometry =  new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 'red'});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//camera
const sizes = {
    width:800,
    height:600
}
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z = 3 
scene.add(camera);

//renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);