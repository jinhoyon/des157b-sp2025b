// 1. Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 2. Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

// 3. Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Orbit Controls (For moving Model)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Lights
var keyLight = new THREE.DirectionalLight (0xffffff, 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight (0xffffff, 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// Loader (Load Avatar)
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('./JinhoWithClothes/');
mtlLoader.load('JinhoWithClothes.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./JinhoWithClothes/');
    objLoader.load('JinhoWithClothes.obj', function (object) {

        scene.add(object);
        object.position.y -= 100;
        object.scale.set(0.1, 0.1, 0.1);

    });

});

// Animate (animate scene)
var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();