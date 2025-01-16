// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add a default box (as a placeholder)
const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
const defaultMaterial = new THREE.MeshStandardMaterial({ color: 0x606060 });
const defaultMesh = new THREE.Mesh(defaultGeometry, defaultMaterial);
scene.add(defaultMesh);

// Function to load an STL or GLB model
function loadModel(filePath) {
  const fileExtension = filePath.split('.').pop().toLowerCase();

  if (fileExtension === 'stl') {
    const loader = new THREE.STLLoader();
    loader.load(filePath, function (geometry) {
      // Remove the default box
      scene.clear();
      scene.add(ambientLight);
      scene.add(directionalLight);

      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });
  } else if (fileExtension === 'glb') {
    const loader = new THREE.GLTFLoader();
    loader.load(filePath, function (gltf) {
      // Remove the default box
      scene.clear();
      scene.add(ambientLight);
      scene.add(directionalLight);

      scene.add(gltf.scene);
    });
  } else {
    alert('Unsupported file format! Please use .stl or .glb files.');
  }
}

// Example: Dynamically load a model
loadModel('models/example.stl'); // Replace with the actual model path

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
