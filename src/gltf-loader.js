import * as three from 'three';
import {GLTFLoader} from 'gltf-loader';

export function loadGeometry(path) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(path, (gltf) => {
      const geometries = gltf.scene.children
        .filter(child => child.type === 'Mesh')
        .map(mesh => mesh.geometry);
      if (geometries.length > 1) {
        resolve(geometries);
      } else {
        resolve(geometries[0]);
      }
    }, undefined, (e) => {
      console.error(e);
      reject(e);
    });
  });
}

export function loadObject(path, name) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(path, (gltf) => {
      const mesh = gltf.scene.getObjectByName(name);
      mesh.animations = gltf.animations;
      resolve(mesh);
    }, undefined, (e) => {
      console.error(e);
      reject(e);
    });
  });
}

export function loadTexture(path) {
  return new Promise((resolve, reject) => {
    new three.TextureLoader().load(path, (texture) => {
      resolve(texture);
    }, undefined, (e) => {
      console.error(e);
      reject(e);
    });
  });
}

export function loadAnimations(path) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(path, (gltf) => {
      resolve(gltf.animations);
    }, undefined, (e) => {
      console.error(e);
      reject(e);
    });
  });
}

export function loadScene(path) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(path, (gltf) => {
      resolve(gltf.scene);
    }, undefined, (e) => {
      console.error(e);
      reject(e);
    });
  });
}
