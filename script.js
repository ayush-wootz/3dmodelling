const viewer = document.getElementById("viewer");

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
viewer.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

// Controls (optional)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Loaders
const stlLoader = new THREE.STLLoader();
const gltfLoader = new THREE.GLTFLoader();

document.getElementById("file-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target.result;

    // Clear existing model
    scene.clear();
    scene.add(light);
    scene.add(ambientLight);

    if (file.name.endsWith(".stl")) {
      const geometry = stlLoader.parse(data);
      const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    } else if (file.name.endsWith(".glb")) {
      gltfLoader.parse(data, "", (gltf) => {
        scene.add(gltf.scene);
      });
    }
  };

  reader.readAsArrayBuffer(file);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
