alert("Hi, welcome to my usability test. This is an informative webpage on the detrimental effects of returning clothes. Go through the different sections and do the following:\n\n1. Talk out loud what you are thinking about or going to do.\n2. If you are stuck, ask questions out loud on what you are trying to do.\n3. Provide a brief summary of what you have learned from this webpage.");

document.addEventListener('DOMContentLoaded', function() {
    var section1 = document.querySelector('#section1'); // select section
    var title = section1.querySelector('h1');   // select section title
    var buttons = section1.querySelectorAll('button');  // selection setcion 1 buttons
    var yesButtonContent = document.querySelector('#yes-button');   // section 1 "yes" button
    var noButtonContent = document.querySelector('#no-button');     // section 1 "no" button
    var yesButtonElements = yesButtonContent.querySelectorAll('p, h2'); // "yes" button text elements
    var noButtonElements = noButtonContent.querySelectorAll('p, h2');   // "no" button text elements
    
    // Add transitions to all elements
    var allElements = [title];
    buttons.forEach(function(button) {
        allElements.push(button);
    });
    yesButtonElements.forEach(function(element) {
        allElements.push(element);
    });
    noButtonElements.forEach(function(element) {
        allElements.push(element);
    });
    
    allElements.forEach(function(element) {
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Show title first
    setTimeout(function() {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        // Then show buttons after title
        setTimeout(function() {
            buttons.forEach(function(button) {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            });
        }, 800);
    }, 800);

    // Add click event to buttons
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.textContent === 'Yes') {
                // Animate Yes button content
                yesButtonElements.forEach(function(element, index) {
                    setTimeout(function() {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 1500);
                });
            } else if (button.textContent === 'No') {
                // Animate No button content
                noButtonElements.forEach(function(element, index) {
                    setTimeout(function() {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 1500);
                });
            }
        });
    });
});

// Canvas
const canvas = document.querySelector('.webgl');

// 1. Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 2. Camera
var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 200;

// 3. Render
var renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Handle window resize
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Orbit Controls (For moving Model)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // adds inertia so model does not stop immediately
controls.dampingFactor = 0.25; // how strong damping is (from 0 to 1)
controls.enableZoom = false; // disable zooming
controls.minDistance = 200; // minimum distance
controls.maxDistance = 200; // maximum distance (same as min to fix distance)
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

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
mtlLoader.setPath('./assets/');
mtlLoader.load('JinhoWithClothes.mtl', function (materials) { // materials = materials parsed from MTL file

    materials.preload(); // prepares materials for use

    // Load OBJ (Geometry - vertices, edges, etc.)
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials); // appy materials to object
    objLoader.setPath('./assets/');
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
