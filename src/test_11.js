import * as three from 'three';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const geometry = computeGeometry();
const material = new three.PointsMaterial({size: 0.015, vertexColors: true});
const mesh = new three.Points(geometry, material);
const renderer = new three.WebGLRenderer({canvas});
const clock = new three.Clock();
let t = 0;

scene.add(mesh);
camera.position.set(0, 1, 2);
camera.lookAt(0, -0.5, 0);

loop();

function loop() {
  t += clock.getDelta();
  animeGeometry(geometry, t);
  mesh.rotation.y = 0.1 * t;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function computeGeometry() {
  const space = 4, nb = 100, amp = 0.1, fre = 1, pi2 = Math.PI * 2;
  const geometry = new three.BufferGeometry();
  const positions = new Float32Array(nb * nb * 3);
  const colors = new Float32Array(nb * nb * 3);
  let k = 0;
  for (let i = 0; i < nb; i++) {
    for (let j = 0; j < nb; j++) {
      const x = i * (space / nb) - space / 2;
      const z = j * (space / nb) - space / 2;
      const y = amp * (Math.cos(x * pi2 * fre) + Math.sin(z * pi2 * fre));
      positions[3 * k + 0] = x;
      positions[3 * k + 1] = y;
      positions[3 * k + 2] = z;
      const intensity = (y / amp) / 2 + 0.3;
      colors[3 * k + 0] = j / nb * intensity;
      colors[3 * k + 1] = 0;
      colors[3 * k + 2] = i / nb * intensity;
      k++;
    }
  }
  geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new three.BufferAttribute(colors, 3));
  geometry.computeBoundingBox();
  return geometry;
}

function animeGeometry(geometry, progress) {
  const space = 4, nb = 100, amp = 0.1, pi2 = Math.PI * 2;
  const phase = progress;
  const fre = 0.8 + Math.cos(progress) / 2;
  let k = 0;
  for (let i = 0; i < nb; i++) {
    for (let j = 0; j < nb; j++) {
      const x = i * (space / nb) - space / 2;
      const z = j * (space / nb) - space / 2;
      const y = amp * (Math.cos(x * pi2 * fre + phase) + Math.sin(z * pi2 * fre + phase));
      geometry.attributes.position.setY(k, y);
      const intensity = (y / amp) / 2 + 0.3;
      geometry.attributes.color.setX(k, j / nb * intensity);
      geometry.attributes.color.setZ(k, i / nb * intensity);
      k++;
    }
  }
  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.color.needsUpdate = true;
}
