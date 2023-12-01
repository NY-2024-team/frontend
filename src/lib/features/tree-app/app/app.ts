import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Vector2,
	Raycaster,
	Object3D,
	PCFSoftShadowMap,
    HemisphereLight,
    Color,
	MeshStandardMaterial,
} from 'three';
import { christmasTree } from './objects/christmassTree';
import type { TreeToy } from './objects/treeToy';
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
		const camera = this.setupCamera(width, height)
		this.camera = camera;

		const renderer = this.setupRenderer(width, height);
		this.renderer = renderer;

		target.appendChild(renderer.domElement);
		this.raycaster = new Raycaster();
		
		const cotrols = this.setupControls();
		this.controls = cotrols;

		const scene = this.setupBaseScene(camera)
		this.scene = scene;

		this.setupListeners();

		this.camera.position.z = 5;
		this.camera.lookAt(christmasTree.position);

		this.play();
	}

	private setupCamera(width: number, height: number): PerspectiveCamera {
		const camera = new PerspectiveCamera(75, width / height, 0.1, 30);

		return camera
	}

	private setupBaseScene(camera: PerspectiveCamera): Scene {
		const scene = new Scene();
        scene.background = new Color(0x87ceeb); 

		const hemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.3);
        hemisphereLight.position.set(5, 10, 7);
        scene.add(hemisphereLight);

		const ground = new Ground();
        scene.add(ground.group);
		
		scene.add(christmasTree);
		scene.add(camera);

		return scene
	}

	private setupRenderer(width: number, height: number): WebGLRenderer {
		const renderer = new WebGLRenderer();
		renderer.setSize(width, height);
        renderer.shadowMap.enabled = true; 
		renderer.shadowMap.type = PCFSoftShadowMap; 
		return renderer
	}

	private setupListeners(): void {
		window.addEventListener('click', this.onPointerClick.bind(this));
	}

	private setupControls(): OrbitControls {
		const controls = new OrbitControls(this.camera, this.renderer.domElement);
		controls.update();
		controls.enablePan = false;
		controls.enableDamping = false;

		return controls
	}

	private render() {
		this.renderer.render(this.scene, this.camera);
	}
	private update() {
		this.controls.update();
		this.updateIntersections();
	}
	private play() {
		this.render();
		this.update();
		window.requestAnimationFrame(this.play.bind(this));
	}

	private updateIntersections(): void {
		const intersections = this.raycaster.intersectObjects(this.getObjects(this.scene), false);
		if (intersections.length > 0) {
			this.activeItem = intersections?.[0].object ?? null;
		}

		if (this.activeItem && 'material' in this.activeItem) {
			if (this.activeItem.material instanceof MeshStandardMaterial   ) {
				this.activeItem.material.color.set(0xff0000);
			}
		}
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
