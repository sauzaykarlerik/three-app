import * as three from 'three';
import {loadTexture} from './gltf-loader.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const geometry = new three.BoxGeometry(1, 1, 1);
const texture = await loadTexture('../assets/diamond.jpg');
const material = new three.MeshPhongMaterial({map: texture});
const mesh = new three.Mesh(geometry, material);
const light = new three.PointLight(0xffffff);

scene.add(light);
scene.add(mesh);
camera.position.set(0, 0, 3);
light.position.set(0, 0, 3);

const renderer = new three.WebGLRenderer({canvas});

function loop() {
  requestAnimationFrame(loop);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

loop();
