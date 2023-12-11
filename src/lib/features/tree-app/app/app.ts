import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Vector2,
	Raycaster,
	Object3D,
	PCFSoftShadowMap,
	HemisphereLight,
	Clock,
} from 'three';
import * as THREE from 'three';
import { christmasTree } from './objects/christmassTree';
import type { TreeToy } from './objects/tree-toy/tree-toy';
import { browser } from '$app/environment';
import { Ground } from './objects/ground';
import CameraControls from 'camera-controls';

export class App {
	private camera: PerspectiveCamera;
	private target: HTMLElement;
	private renderer: WebGLRenderer;
	private scene: Scene;
	private pointer: Vector2 = new Vector2();
	private raycaster: Raycaster;
	private activeItem: Object3D | null = null;
	private createdToy: TreeToy | null = null;
	private controls: CameraControls;
	private clock: Clock;

	private toys: TreeToy[] = [];

	constructor(target: HTMLElement) {
		if (!browser || typeof window === 'undefined') throw new Error('Something went wrong!');
		CameraControls.install({ THREE: THREE });
		this.clock = new Clock();
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
		const camera = new PerspectiveCamera(75, width / height, 0.1, 100);

		return camera;
	}

	private setupBaseScene(camera: PerspectiveCamera): Scene {
		const scene = new Scene();

		const hemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.3);
		hemisphereLight.position.set(5, 10, 7);
		scene.add(hemisphereLight);

		const ground = new Ground();
		scene.add(ground.group);
		this.controls.colliderMeshes.push(ground.group);

		const { x, y, z } = christmasTree.position;
		this.controls.setLookAt(3, 10, 3, x, y + 3, z, true);

		scene.add(christmasTree);
		scene.add(camera);

		this.toys.forEach((item) => scene.add(item.group));

		scene.fog = new THREE.FogExp2(0xcccccc, 0.09)

		return scene;
	}

	public setCreatedToy(toy: TreeToy | null): void {
		this.createdToy = toy;
		if (toy) {
			this.scene.add(toy.group)
		}
	}

	private setupRenderer(width: number, height: number): WebGLRenderer {
		const renderer = new WebGLRenderer();
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFSoftShadowMap;
		renderer.autoClear = false;
		renderer.domElement.style.backgroundColor = 'rgb(255, 255, 255)';
		return renderer;
	}

	private setupListeners(): void {
		this.renderer.domElement.addEventListener('mousedown', this.onPointerClick.bind(this), false);
		this.renderer.domElement.addEventListener('mousemove', this.onPointerMove.bind(this), false)
		this.renderer.domElement.addEventListener('resize', this.onWindowResize.bind(this), false);
	}

	private onWindowResize() {
		const { width, height } = this.target.getBoundingClientRect();
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
	}

	private setupControls(): CameraControls {
		const controls = new CameraControls(this.camera, this.renderer.domElement);
		controls.mouseButtons.middle = CameraControls.ACTION.ROTATE;
		controls.mouseButtons.wheel = CameraControls.ACTION.ZOOM;
		// controls.mouseButtons.right = CameraControls.ACTION.NONE;
		return controls;
	}

	private render() {
		this.renderer.render(this.scene, this.camera);
	}
	private update() {
		this.controls.update(this.clock.getDelta());
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
		this.pointer.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1;
		this.pointer.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1;

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersections = this.raycaster.intersectObjects(this.getObjects(this.scene), true);

		if (intersections.length > 0) {
			console.log(intersections[0])
			this.activeItem = intersections[0].object ?? null;
		}
	}

	private onPointerMove(event: MouseEvent) {
		this.pointer.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1;
		this.pointer.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1;

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersections = this.raycaster.intersectObjects(this.getObjects(this.scene), true);
		if (!this.createdToy) return;

		if (intersections.length > 0) {
			const intersected = intersections.find(item => item.object.name === 'tree_top')

			if (!intersected) return;
			const { x, y, z } = intersected.point
			const treeIds = christmasTree.children.map(item => item.id)
			if (treeIds.includes(intersected.object.id)) {
				this.createdToy.group.position.set(x, y, z)
			}
		}
	}
}
