// Imports for then THREEJS is instaled locally
// However, need to deploy on github pages, thus will use CDN

// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
$(window).load(function(){
    $('.flexslider').flexslider(
        {
        animation: "slide",
        slideShowSpeed: 2000,
        direction: "vertical",
        reverse: true,
        pauseonHover: true,
        }
    );
});


const canvas = document.querySelector('.webgl');
// 1. scene
const scene = new THREE.Scene();

let root;

const loader = new THREE.GLTFLoader();
loader.load("./model/Racket.glb", function( glb ){
    console.log(glb);
    root = glb.scene;
    // root.scale.set(2.5,2.5,2.5);
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
}, function(error){
    console.log("Error Occurred");
})


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,0,1);
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

camera.position.set(0,0.5,1);
scene.add(camera);

// 3. renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
renderer.shadowMap.enabled = true;

// Deprecated:
// renderer.gammaOutput = true;
renderer.outputEncoding = THREE.sRGBEncoding;

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    // root.rotation.x += 0.01;
    root.rotation.y += 0.01;
}


animate();