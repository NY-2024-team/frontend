import { Color, HemisphereLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import type { TreeToy, TreeToyProperties } from '../app/objects/treeToy';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export class Preview {
	private container: HTMLElement;
	private treeToy: TreeToy;
    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: PerspectiveCamera;
    private controls: OrbitControls

	constructor(target: HTMLElement, treeToy: TreeToy) {
		this.container = target;
		this.treeToy = treeToy;
        this.setupToy();
        if(!target) throw new Error('Cannot get element')
		const { width, height } = target.getBoundingClientRect();
		const renderer = new WebGLRenderer();
        this.renderer = renderer;
		renderer.setSize(width, height);
		window.requestAnimationFrame(() => target.appendChild(renderer.domElement));
        

        const scene = new Scene();
        this.scene = scene;
        scene.background = new Color(0x87ceeb); 
        const camera = new PerspectiveCamera(45, width / height, 0.1, 20);
        this.camera = camera;

        scene.add(camera);
        scene.add(treeToy.group);
        this.setupCamera();
        
        const hemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.3);
        hemisphereLight.position.set(5, 10, 7);
        scene.add(hemisphereLight);

        const controls = this.setupControls();
        this.controls = controls;
        this.animate();
    }

    private setupCamera() {
        this.camera.position.copy(this.treeToy.group.position)
        this.camera.position.z = 0.5
        this.camera.lookAt(this.treeToy.group.position)
    }

    private setupToy() {
        this.treeToy.group.position.x = 0;
        this.treeToy.group.position.y = 0;
        this.treeToy.group.position.z = 0;
        this.treeToy.group.rotateX(0);
        this.treeToy.group.rotateY(0);
        this.treeToy.group.rotateZ(0);
    }

    private setupControls(): OrbitControls {
		const controls = new OrbitControls(this.camera, this.renderer.domElement);
		controls.update();
		controls.cursor = this.treeToy.group.position
		controls.target = this.treeToy.group.position
		controls.enablePan = true;
		controls.maxTargetRadius = 2;
		controls.minTargetRadius = 3;
		controls.enableDamping = false;
		controls.maxPolarAngle = Math.PI / 1.65
		controls.maxAzimuthAngle = Math.PI
		controls.maxDistance = 0.8
        controls.minDistance = 0.3
		controls.minPolarAngle = Math.PI / 5

		return controls
	}

    public downloadTexture(props: TreeToyProperties) {
        this.treeToy.download(this.treeToy.createTexture(props))
    }
    
    public updateToyTexture(props: TreeToyProperties) {
        this.treeToy.updateTexture(props);

    }

    private animate() {
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.animate.bind(this));
    }
}
