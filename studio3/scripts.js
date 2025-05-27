// 1. Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 2. Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 200;

// 3. Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls (For moving Model)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // adds inertia so model does not stop immediately
controls.dampingFactor = 0.25; // how strong damping is (from 0 to 1)

// 4. Lights

// Main light (Direct light source)
var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(-200, 0, 200);

// Soften Shadows (Weaker light that fills dark areas)
var fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
fillLight.position.set(200, 0, 200);

// Behind subject (creates depth, "glowing outline")
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(200, 0, -200).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// Loader (Load Avatar)

// Load MTL (Material Definitions - textures, colors, etc.)
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('./Model/');
mtlLoader.load('JinhoWithClothes.mtl', function (materials) { // materials = materials parsed from MTL file

    materials.preload(); // prepares materials for use

    // Load OBJ (Geometry - vertices, edges, etc.)
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials); // appy materials to object
    objLoader.setPath('./Model/');
    objLoader.load('JinhoWithClothes.obj', function (object) {

        scene.add(object);
        object.position.y -= 100;
        object.scale.set(0.1, 0.1, 0.1);

    });

});

// Animation loop
var animate = function () {
    requestAnimationFrame(animate); // call animate() again
    controls.update(); // update orbit controls
    renderer.render(scene, camera); // render scene from camera's POV
};

animate();