import * as three from 'three';
import {loadGeometry, loadTexture} from './gltf-loader.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const geometry = await loadGeometry('../assets/mario.glb');
const texture = await loadTexture('../assets/mario.png');
const material = new three.MeshPhongMaterial({map: texture, shininess: 0});
const mesh = new three.Mesh(geometry, material);
const light = new three.PointLight(0xffffff);
const ambientLight = new three.AmbientLight(0xe6e6e6);
const renderer = new three.WebGLRenderer({canvas});

scene.add(light);
scene.add(ambientLight);
scene.add(mesh);
camera.position.set(0, 1.5, 4);
light.position.set(0, 4, 4);

function loop() {
  requestAnimationFrame(loop);
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

loop();
