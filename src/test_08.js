import * as three from 'three';
import {loadObject, loadTexture} from './gltf-loader.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const mesh = await loadObject('../assets/bibi.glb', 'bibi');
const texture = await loadTexture('../assets/bibi.png');
const light = new three.PointLight(0xeeeeee);
const ambientLight = new three.AmbientLight(0xe6e6e6);

mesh.material = new three.MeshPhongMaterial({map: texture, shininess: 0});

const renderer = new three.WebGLRenderer({canvas});
const mixer = new three.AnimationMixer(mesh);
const clock = new three.Clock();

scene.add(light);
scene.add(ambientLight);
scene.add(mesh);
camera.position.set(0, 1.5, 4);
light.position.set(0, 4, 4);

mixer.clipAction(mesh.animations[0]).setDuration(5).play();

function loop() {
  requestAnimationFrame(loop);
  const dt = clock.getDelta();
  mixer.update(dt);
  renderer.render(scene, camera);
}

loop();
