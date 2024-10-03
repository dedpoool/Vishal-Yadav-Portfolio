import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Constants
const CAMERA_FOV = 75;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;
const CUBE_SIZE = 3;
const CUBE_COLOR = 0x374151;

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR, CAMERA_FAR);
const mainCanvas = document.getElementById("mainCanvas");
const renderer = new THREE.WebGLRenderer({alpha: true, canvas: mainCanvas, antialias: true});

// Setup renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

// Create cube
const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
const material = new THREE.MeshBasicMaterial({ color: CUBE_COLOR, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera and rotate cube
camera.position.set(2, 0, 1);
cube.rotation.y = Math.PI / 4;

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Handle window resize
window.addEventListener('resize', onWindowResize);

// Setup OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.enableZoom = false;

function animate() {
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
