// Canvas
const canvas = document.querySelector(".webgl");

// 1. Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 2. Camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 200;

// 3. Render
// var renderer = new THREE.WebGLRenderer();
var renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
renderer.shadowMap.enabled = true;

// Orbit Controls (For moving Model)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // adds inertia so model does not stop immediately
controls.dampingFactor = 0.25; // how strong damping is (from 0 to 1)
controls.enableZoom = true;

// Fix Rotation to y-axis
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

// 4. Lights

// Main light (Direct light source)
var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(-200, 0, 200).normalize();

// Soften Shadows (Weaker light that fills dark areas)
var fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
fillLight.position.set(200, 0, 200).normalize();

// Behind subject (creates depth, "glowing outline")
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(200, 0, -200).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// Loader (Load Avatar)
// Load MTL (Material Definitions - textures, colors, etc.)
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("./assets/");
mtlLoader.load("JinhoWithClothes.mtl", function (materials) {
  // materials = materials parsed from MTL file

  materials.preload(); // prepares materials for use

  // Load OBJ (Geometry - vertices, edges, etc.)
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials); // appy materials to object
  objLoader.setPath("./assets/");
  objLoader.load("JinhoWithClothes.obj", function (object) {
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

// ChartJS
async function makePieCharts() {
  // Get the data from data.json
  const data = await getData();

  Object.keys(data).forEach((day, index) => {
    const category = Object.keys(data[day]);
    const time = Object.values(data[day]);
    // make legend text color black
    makeChart(day, category, time, "#3C3C43");
  });
}

async function getData() {
  // Fetch data from data.json
  const myTime = await fetch("./data/data.json");

  // Parse response object body as JSON
  const data = await myTime.json();

  return data;
}

function makeChart(day, category, time, legendTextColor) {
  const canvasId = `${day}`;

  new Chart(canvasId, {
    type: "pie",
    data: {
      labels: category,
      datasets: [
        {
          backgroundColor: ["#b9d0de", "#44b2f2", "#1f89c6"],
          data: time,
          borderWidth: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: legendTextColor,
          },
        },
      },
    },
  });
}

animate();
makePieCharts();
