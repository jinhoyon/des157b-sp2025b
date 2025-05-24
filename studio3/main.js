// Imports for then THREEJS is installed locally
// However, need to deploy on github pages, thus will use CDN

// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector('.webgl');
// 1. scene
const scene = new THREE.Scene();

let root;
let shouldAnimate = false;  // Add flag to control animation

const loader = new THREE.GLTFLoader();

// Log the current URL to help debug path issues
console.log("Current URL:", window.location.href);

// Use absolute path for GitHub Pages
const modelPath = window.location.href.includes('github.io') 
    ? 'https://jinhoyon.github.io/des157b-sp2025b/studio3/model/Racket.glb'  // Full GitHub Pages URL
    : './model/Racket.glb';  // Local development path

console.log("Attempting to load model from:", modelPath);

loader.load(
    modelPath,
    function(glb) {
        console.log("Model loaded successfully:", glb);
        root = glb.scene;
        scene.add(root);
        renderer.render(scene, camera);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function(error) {
        console.error("Error loading model:", error);
        // Log more details about the error
        if (error.target) {
            console.error("Error URL:", error.target.responseURL);
            console.error("Error Status:", error.target.status);
            console.error("Error Response:", error.target.response);
        }
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// 2. camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);

camera.position.set(0, 0, 2); // Move camera back a bit
camera.lookAt(0, 0, 0);
scene.add(camera);

// 3. renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
renderer.shadowMap.enabled = true;

// Deprecated:
// renderer.gammaOutput = true;
renderer.outputEncoding = THREE.sRGBEncoding;

// Add a background color to make sure the scene is visible
scene.background = new THREE.Color(0x808080); // Gray background