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
loader.load(
    "./model/Racket.glb", 
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
    }
);

// Add ambient light to make sure the object is visible
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

// Modify camera position to ensure we can see the object
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