import * as three from 'three';
import {loadObject, loadTexture} from './gltf-loader.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const mesh = await loadObject('../assets/bibi2.glb', 'bibi');
const texture = await loadTexture('../assets/bibi.png');
const light = new three.PointLight(0xffffff);
const renderer = new three.WebGLRenderer({canvas});

mesh.children[1].material = new three.MeshPhongMaterial({map: texture, shininess: 0});

const mixer = new three.AnimationMixer(mesh);
const clock = new three.Clock();
let t = 0;

scene.add(light);
scene.add(mesh);
camera.position.set(0, 1.5, 4);
light.position.set(0, 4, 4);
mixer.clipAction(mesh.animations[0]).setDuration(2).play();
mixer.clipAction(mesh.animations[1]).setDuration(2).play();

function loop() {
  const dt = clock.getDelta();
  t += dt;
  mixer.update(dt);
  mesh.rotation.y = Math.cos(t / 2);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

loop();
