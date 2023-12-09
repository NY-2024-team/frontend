import { browser } from "$app/environment";
import { Group } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader()


const christmasTree = new Group();

if (browser) {
    loader.load('new_year_tree.glb', (gltf) => {
        console.log(gltf)
        christmasTree.add(...gltf.scene.children)
    })
}

christmasTree.castShadow = true;
christmasTree.receiveShadow = true;


export { christmasTree }