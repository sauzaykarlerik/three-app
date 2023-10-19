import * as three from 'three';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(70, iw / ih);
const geometry = new three.BoxGeometry(1, 1, 1);
const material = new three.MeshBasicMaterial({color: 0xffffff});
const mesh = new three.Mesh(geometry, material);

scene.add(mesh);
camera.position.set(0, 0, 2);

const renderer = new three.WebGLRenderer({canvas});

renderer.render(scene, camera);
