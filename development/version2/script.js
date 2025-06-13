// Global variables
let tshirtClickCount = 0;
let purchasedTshirts = [];

// Scroll Animation and Button Behavior
(function () {
    'use strict';

    // Section 1 Animation Setup
    var title = section1.querySelector('h1');

    // Title Animation Setup
    if (title) {
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
    }

    // Animate Title
    if (title) {
        setTimeout(function () {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 800);
    }

    // Scroll to next section
    const continueBtn = document.getElementById('continue-btn');
    const buyClothes = document.getElementById('buy-clothes');

    if (continueBtn && buyClothes) {
        continueBtn.addEventListener('click', function (e) {
            e.preventDefault();
            buyClothes.scrollIntoView({ behavior: 'smooth' });
        });
    }

     // Update iPhone time
     const updateIPhoneTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        document.getElementById('iphone-time').textContent = timeString;
    };
    updateIPhoneTime();
    setInterval(updateIPhoneTime, 60000);


    // t-shirt click handler
    const appTshirts = document.querySelectorAll('.contents');
    appTshirts.forEach(tshirt => {
        tshirt.addEventListener('click', () => {
            // Get t-shirt details
            const tshirtDetails = {
                name: tshirt.querySelector('p:first-of-type').textContent,
                price: tshirt.querySelector('p:last-of-type').textContent,
                image: tshirt.querySelector('img').src
            };
            createAndMoveTruck(tshirtDetails);
        });
    });

    // Truck move logic
    const createAndMoveTruck = (tshirtDetails) => {
        tshirtClickCount++;
        console.log(tshirtClickCount);

        // Add t-shirt details to purchased array
        purchasedTshirts.push({
            name: tshirtDetails.name,
            price: tshirtDetails.price,
            timestamp: new Date().toISOString(),
            image: tshirtDetails.image
        });

        console.log('Purchased T-shirts:', purchasedTshirts);

        const newTruck = document.createElement('div');
        newTruck.className = 'delivery-truck';
        newTruck.innerHTML = '<img src="./images/delivery-truck.png" alt="Delivery Truck Image">';

        newTruck.style.left = '24%';
        newTruck.style.bottom = '0.8%';
        newTruck.style.position = 'absolute';
        newTruck.style.zIndex = '-1';

        // Append to #buy-clothes section instead of body
        const buyClothesSection = document.getElementById('buy-clothes');
        buyClothesSection.appendChild(newTruck);

        // Create and show purchased message
        const purchasedMessage = document.createElement('div');
        purchasedMessage.className = 'purchased-message';
        purchasedMessage.innerHTML = '<p>✅ Delivery is on the way!</p>';
        buyClothesSection.appendChild(purchasedMessage);

        // Show purchased message
        purchasedMessage.style.display = 'flex';
        purchasedMessage.style.animation = 'fadeInOut 3s ease-in-out';
        
        // Remove message after animation
        setTimeout(() => {
            purchasedMessage.remove();
        }, 3000);

        // Move the truck across the screen
        setTimeout(() => {
            newTruck.style.transition = 'left 15s linear';
            newTruck.style.left = '80%';
        }, 0);
    };

    // ======== Three.js Setup ========
    // Canvas
    const canvas = document.querySelector('.webgl');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 200;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Resize Handling
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.minDistance = 200;
    controls.maxDistance = 200;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(-200, 0, 200);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
    fillLight.position.set(200, 0, 200);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(200, 0, -200).normalize();
    scene.add(backLight);

    // Load 3D Model
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('./assets/');
    mtlLoader.load('JinhoWithClothes.mtl', function (materials) {
        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./assets/');
        objLoader.load('JinhoWithClothes.obj', function (object) {
            object.position.y -= 100;
            object.scale.set(0.1, 0.1, 0.1);
            scene.add(object);
        });
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
})();
