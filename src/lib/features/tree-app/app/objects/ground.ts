import { browser } from '$app/environment';
import { Group } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class Ground {
	public group: Group;
	private loader: GLTFLoader = new GLTFLoader();

	constructor() {
		if (!browser) throw new Error('only for browsers!');
		this.group = new Group();
		this.loader.load('new_year_ground.glb', (gltf) => {
			this.group.add(...gltf.scene.children)
		})
	}


}
