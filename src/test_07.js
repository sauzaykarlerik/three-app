import * as three from 'three';
import {loadGeometry, loadTexture} from './gltf-loader.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const geometry = await loadGeometry('../assets/bibi.glb');
const texture = await loadTexture('../assets/bibi.png');
const material = new three.MeshPhongMaterial({map: texture, shininess: 1});
const mesh = new three.Mesh(geometry, material);
const light = new three.PointLight(0xffffff);
const ambientLight = new three.AmbientLight(0xe6e6e6);
const renderer = new three.WebGLRenderer({canvas});
const clock = new three.Clock();
let t = 0;

scene.add(light);
scene.add(ambientLight);
scene.add(mesh);
camera.position.set(0, 1.5, 4);
light.position.set(0, 4, 4);

function loop() {
  t += clock.getDelta();
  mesh.morphTargetInfluences[1] = Math.abs(Math.cos(t));
  mesh.rotation.y = Math.cos(t / 2);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

loop();
