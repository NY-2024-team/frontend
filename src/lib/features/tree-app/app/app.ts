import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Vector2,
	Raycaster,
	Object3D,
	PCFSoftShadowMap,
	HemisphereLight,
	Color
} from 'three';
import { christmasTree } from './objects/christmassTree';
import { TreeToy } from './objects/treeToy';
import { browser } from '$app/environment';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Ground } from './objects/ground';

export class App {
	private camera: PerspectiveCamera;
	private target: HTMLElement;
	private renderer: WebGLRenderer;
	private scene: Scene;
	private pointer: Vector2 = new Vector2();
	private raycaster: Raycaster;
	private activeItem: Object3D | null = null;
	private controls: OrbitControls;

	private toys: TreeToy[] = [];

	constructor(target: HTMLElement) {
		if (!browser || typeof window === 'undefined') throw new Error('Something went wrong!');
		this.target = target;
		const { width, height } = target.getBoundingClientRect();
		const camera = this.setupCamera(width, height);
		this.camera = camera;

		const renderer = this.setupRenderer(width, height);
		this.renderer = renderer;

		target.appendChild(renderer.domElement);
		this.raycaster = new Raycaster();

		const cotrols = this.setupControls();
		this.controls = cotrols;

		const scene = this.setupBaseScene(camera);
		this.scene = scene;

		this.setupListeners();

		this.camera.position.z = 5;
		this.camera.lookAt(christmasTree.position);

		this.play();
	}

	private setupCamera(width: number, height: number): PerspectiveCamera {
		const camera = new PerspectiveCamera(75, width / height, 0.1, 30);

		return camera;
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

		this.toys.push(new TreeToy());
		this.toys.forEach((item) => scene.add(item.group));

		return scene;
	}

	private setupRenderer(width: number, height: number): WebGLRenderer {
		const renderer = new WebGLRenderer();
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFSoftShadowMap;
		return renderer;
	}

	private setupListeners(): void {
		window.addEventListener('mousedown', this.onPointerClick.bind(this), false);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
	}

	private onWindowResize() {
		const { width, height } = this.target.getBoundingClientRect();
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
	}

	private setupControls(): OrbitControls {
		const controls = new OrbitControls(this.camera, this.renderer.domElement);
		controls.update();
		controls.cursor = christmasTree.position;
		controls.target = christmasTree.position;
		controls.enablePan = true;
		controls.maxTargetRadius = 2;
		controls.minTargetRadius = 3;
		controls.enableDamping = false;
		controls.maxPolarAngle = Math.PI / 1.65;
		controls.maxAzimuthAngle = Math.PI;
		controls.maxDistance = 8;
		controls.minPolarAngle = Math.PI / 5;

		return controls;
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
