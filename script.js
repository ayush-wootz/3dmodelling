// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load the STL model
const stlLoader = new THREE.STLLoader();
stlLoader.load(
  'models/2024_nissan_gt-r_nismo.glb', // Replace with the relative path to your STL file
  function (geometry) {
    const material = new THREE.MeshStandardMaterial({ color: 0x606060, roughness: 0.5 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Progress indicator
  },
  function (error) {
    console.error('An error occurred:', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
