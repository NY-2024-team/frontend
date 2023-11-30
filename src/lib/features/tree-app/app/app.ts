import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Vector2,
	Raycaster,
	Object3D,
	MeshBasicMaterial,
	PCFSoftShadowMap,
    HemisphereLight,
    Color,
} from 'three';
import { christmasTree } from './objects/christmassTree';
import { TreeToy } from './objects/treeToy';
import { browser } from '$app/environment';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Ground } from './objects/ground';

export class App {
	private camera: PerspectiveCamera;
	private renderer: WebGLRenderer;
	private scene: Scene;
	private pointer: Vector2 = new Vector2();
	private raycaster: Raycaster;
	private activeItem: Object3D | null = null;
	private controls: OrbitControls;

	private toys: TreeToy[] = [];

	constructor(target: HTMLElement) {
		if (!browser || typeof window === 'undefined') throw new Error('Something went wrong!');
		const { width, height } = target.getBoundingClientRect();
		this.camera = new PerspectiveCamera(75, width / height, 0.1, 30);
		this.renderer = new WebGLRenderer();
		this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true; // Включить тени
		this.renderer.shadowMap.type = PCFSoftShadowMap; // Тип теней

		target.appendChild(this.renderer.domElement);
		this.raycaster = new Raycaster();
		window.addEventListener('click', this.onPointerClick.bind(this));
		const scene = new Scene();
        scene.background = new Color(0x87ceeb); 
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();
		this.controls.enablePan = false;
		this.controls.enableDamping = false;

		this.scene = scene;

        const hemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.3);
        hemisphereLight.position.set(5, 10, 7);
        // hemisphereLight.castShadow = true;
        this.scene.add(hemisphereLight);


        const ground = new Ground();
        scene.add(ground.group);

		scene.add(christmasTree);
		6;

		scene.add(this.camera);

		this.camera.position.z = 5;
		this.camera.position.y = 0;
		this.camera.lookAt(christmasTree.position);

		this.toys.push(new TreeToy());
		for (const toy of this.toys) {
			scene.add(toy.group);
		}

		this.animate();
	}

	private animate() {
		this.controls.update();
		const intersections = this.raycaster.intersectObjects(this.getObjects(this.scene), false);
		if (intersections.length > 0) {
			this.activeItem = intersections?.[0].object ?? null;
		}

		if (this.activeItem && 'material' in this.activeItem) {
			if (this.activeItem.material instanceof MeshBasicMaterial   ) {
				this.activeItem.material.color.set(0xff0000);
			}
		}

		this.renderer.render(this.scene, this.camera);

		window.requestAnimationFrame(this.animate.bind(this));
	}

	private getObjects(obj: Object3D): Object3D[] {
		const objects: Object3D[] = [];

		obj.children.forEach((child: Object3D) => {
			objects.push(child);
			objects.push(...this.getObjects(child));
		});

		return objects;
	}

	private onPointerClick(event: MouseEvent) {
		this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersections = this.raycaster.intersectObjects(this.getObjects(this.scene), true);

		if (intersections.length > 0) {
			this.activeItem = intersections[0].object ?? null;
		}
	}
}
