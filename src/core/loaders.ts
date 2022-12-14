import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadGltf = url => new Promise((res, rej) => new GLTFLoader().load(url, data => res(data), undefined, rej));
