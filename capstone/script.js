// Global variables
let currentSection = 0;
let tshirtClickCount = 0;
let purchasedTshirts = [];
// const maxClicks = 9;

(function () {
    'use strict';

    // Initialize body with first section active
    document.body.className = 'section-active-0';

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

    // Section 0 Animation Setup
    var section0 = document.querySelector('#section0');
    var title = section0.querySelector('h1');
    var subtitle = section0.querySelector('p');

    // Title Animation Setup
    if (title) {
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
    }

    // Subtitle Animation Setup
    if (subtitle) {
        subtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
    }

    // Animate Title first
    if (title) {
        setTimeout(function () {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 800);
    }

    // Animate Subtitle after title
    if (subtitle) {
        setTimeout(function () {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 1400); // 800ms delay + 600ms after title starts
    }

    // Initialize section 1 elements in hidden state
    document.addEventListener('DOMContentLoaded', function() {
        const section1 = document.getElementById('section1');
        if (section1) {
            // Hide emotional words initially
            const emotionalWords = section1.querySelectorAll('.section-1-instructions h2');
            emotionalWords.forEach(word => {
                word.style.visibility = 'hidden';
                word.style.opacity = '0';
                word.style.transform = 'translateX(-50px) scale(0.8)';
                word.style.transition = 'none'; // Prevent transition on initial hide
            });

            // Hide other section 1 elements
            const section1Title = section1.querySelector('.section-1-instructions h1');
            if (section1Title) {
                section1Title.style.opacity = '0';
                section1Title.style.transform = 'translateY(20px)';
            }

            const section1App = section1.querySelector('.app');
            if (section1App) {
                section1App.style.opacity = '0';
                section1App.style.transform = 'translateY(50px)';
            }

            const pElements = section1.querySelectorAll('.section-1-instructions p');
            pElements.forEach(p => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(-20px)';
            });
        }

        // Add click event listeners to section 2 t-shirts
        const tshirts = document.querySelectorAll('.tshirt');
        tshirts.forEach(tshirt => {
            tshirt.addEventListener('click', handleTshirtClick);
        });
        console.log('Added click listeners to t-shirts');   // Debug
    });

    // Section Navigation
    function navigateToSection(sectionNumber) {
        currentSection = sectionNumber;
        document.body.className = `section-active-${sectionNumber}`;
        
        // Wait for section transition to complete (500ms) before starting animations
        setTimeout(() => {
            // Trigger animations for the new section
            animateSectionTitle(sectionNumber);
            
            // Additional section-specific animations
            if (sectionNumber === 1) {
                // Re-enable transitions for emotional words
                const section1 = document.getElementById('section1');
                const emotionalWords = section1.querySelectorAll('.section-1-instructions h2');
                emotionalWords.forEach(word => {
                    word.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                });
                
                // Special handling for section 1's title and instructions
                animateSection1Title();
                animateSection1App();
                // Wait an additional moment before starting instructions animation
                setTimeout(() => {
                    animateSection1Instructions();
                }, 100);
            } else if (sectionNumber === 5) {
                animateThreeDApp();
            }
        }, 500);
    }

    // Generic section title animation function
    function animateSectionTitle(sectionNumber) {
        const section = document.getElementById(`section${sectionNumber}`);
        const title = section ? section.querySelector('h2') || section.querySelector('h1') : null;
        
        if (title) {
            // Set initial state
            title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            
            // Animate to final state after a short delay
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Initialize all section titles in hidden state
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize titles for all sections except current
        for (let i = 0; i <= 5; i++) {
            if (i !== currentSection) {
                const section = document.getElementById(`section${i}`);
                const title = section ? section.querySelector('h2') || section.querySelector('h1') : null;
                if (title) {
                    title.style.opacity = '0';
                    title.style.transform = 'translateY(20px)';
                    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                }
            }
        }
    });

    // 3D App Animation
    function animateThreeDApp() {
        const threeDApp = document.getElementById('threeD-app');
        if (threeDApp) {
            threeDApp.style.transition = 'opacity 1s ease, transform 1s ease';
            threeDApp.style.opacity = '0';
            threeDApp.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                threeDApp.style.opacity = '1';
                threeDApp.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Section 1 App Animation
    function animateSection1App() {
        const section1 = document.getElementById('section1');
        const app = section1 ? section1.querySelector('.app') : null;
        
        if (app) {
            app.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            app.style.opacity = '0';
            app.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                app.style.opacity = '1';
                app.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Section 1 Title Animation
    function animateSection1Title() {
        const section1 = document.getElementById('section1');
        const title = section1 ? section1.querySelector('.section-1-instructions h1') : null;
        
        if (title) {
            // Set initial state
            title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            
            // Animate to final state after a short delay
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Section 1 Instructions Animation
    function animateSection1Instructions() {
        const section1 = document.getElementById('section1');
        const instructionsDiv = section1 ? section1.querySelector('.section-1-instructions') : null;
        
        if (instructionsDiv) {
            const pElements = instructionsDiv.querySelectorAll('p');
            const emotionalWords = instructionsDiv.querySelectorAll('h2');
            
            // Hide emotional words initially
            emotionalWords.forEach(word => {
                word.style.visibility = 'hidden';
                word.style.opacity = '0';
                word.style.transform = 'translateX(-50px) scale(0.8)';
            });

            const timePerP = 1800; 
            const totalPTime = timePerP * pElements.length;
            
            // Animate instruction paragraphs
            pElements.forEach((p, index) => {
                p.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // Faster transition
                p.style.opacity = '0';
                p.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, 1000 + (index * timePerP)); // Reduced initial delay from 2000ms to 1000ms
            });

            // Start emotional words animation after ALL p elements have finished
            const startEmotionalWords = 1000 + totalPTime + 500; // Reduced buffer from 1000ms to 500ms

            // Animate emotional words with more impact
            emotionalWords.forEach((word, index) => {
                word.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'; // Slightly faster transition
                
                setTimeout(() => {
                    word.style.visibility = 'visible';
                    word.style.opacity = '1';
                    word.style.transform = 'translateX(0) scale(1)';
                    word.style.animation = 'emphasize 0.5s ease-out forwards';
                }, startEmotionalWords + (index * 1000)); // Reduced spacing from 1500ms to 1000ms
            });

            // Log animation timing for debugging
            console.log('Total p elements:', pElements.length);
            console.log('Time for all p elements:', totalPTime);
            console.log('Emotional words start at:', startEmotionalWords);
        }
    }

    // Initialize animations
    const threeDApp = document.getElementById('threeD-app');
    if (threeDApp && currentSection !== 5) {
        threeDApp.style.opacity = '0';
        threeDApp.style.transform = 'translateY(50px)';
        threeDApp.style.transition = 'opacity 1s ease, transform 1s ease';
    }

    const section1 = document.getElementById('section1');
    const section1Title = section1 ? section1.querySelector('.section-1-instructions h1') : null;
    if (section1Title && currentSection !== 1) {
        section1Title.style.opacity = '0';
        section1Title.style.transform = 'translateY(20px)';
        section1Title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    const section1App = section1 ? section1.querySelector('.app') : null;
    if (section1App && currentSection !== 1) {
        section1App.style.opacity = '0';
        section1App.style.transform = 'translateY(50px)';
        section1App.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    const section1Instructions = section1 ? section1.querySelector('.section-1-instructions') : null;
    if (section1Instructions && currentSection !== 1) {
        const pElements = section1Instructions.querySelectorAll('p');
        const h2Elements = section1Instructions.querySelectorAll('h2');
        
        pElements.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(-20px)';
            p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        h2Elements.forEach(h2 => {
            h2.style.opacity = '0';
        });
    }

    // Section 4 T-shirt click handler for app
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

    // Truck move logic for section 4
    const createAndMoveTruck = (tshirtDetails) => {
        tshirtClickCount++;
        console.log('Creating truck for purchase:', tshirtClickCount);

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

        // Append to #section4 section instead of section1
        const section4Element = document.getElementById('section4');
        section4Element.appendChild(newTruck);

        // Create and show purchased message
        const purchasedMessage = document.createElement('div');
        purchasedMessage.className = 'purchased-message';
        purchasedMessage.innerHTML = '<p>☠️ Returning your order </p>';
        section4Element.appendChild(purchasedMessage);

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
            newTruck.style.left = '88%';
        }, 0);
    };

    // Continue button event listeners
    const continueButtons = document.querySelectorAll('.continue-btn');
    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = parseInt(this.getAttribute('data-next'));
            navigateToSection(nextSection);
        });
    });

    // Back button event listeners
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevSection = parseInt(this.getAttribute('data-prev'));
            navigateToSection(prevSection);
        });
    });

    // Update iPhone time
    function updateTime() {
        const timeElements = document.querySelectorAll('#iphone-time');
        timeElements.forEach(timeElement => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
        });
    }

    // Update time initially and every minute
    updateTime();
    setInterval(updateTime, 60000);

    // Section 2 T-shirt and Box Logic
    function handleTshirtClick(event) {
        const tshirtId = event.target.id;
        
        // Skip if it's the gray t-shirt
        if (tshirtId === 'tshirt-gray1') {
            return;
        }

        // Only process black t-shirt clicks
        if (tshirtId.startsWith('tshirt-black')) {
            const boxNumber = tshirtId.replace('tshirt-black', '');
            const box = document.getElementById(`box${boxNumber}`);
            
            // Show the box
            box.style.display = 'block';
            box.style.opacity = '1';
            box.style.visibility = 'visible';
            
            // Change t-shirt image to box and animate position
            const tshirt = event.target;
            tshirt.style.transition = 'transform 0.5s ease';
            tshirt.style.transform = 'translateY(+300px)';
            setTimeout(() => {
                tshirt.src = './images/box.png';
            }, 250); // Change image halfway through the animation
            
            tshirtClickCount++;
            console.log(`Box ${boxNumber} shown, total clicks: ${tshirtClickCount}`);
        }
    }

})();
