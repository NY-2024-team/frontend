import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AmbientLight,
    PointLight,
  } from 'three';
import { christmasTree } from './objects/christmassTree';
import { TreeToy } from './objects/treeToy';

export class App {
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private scene: Scene;

    private toys: TreeToy[] = [];

    constructor(target: HTMLElement) {
        const {width, height} = target.getBoundingClientRect();
        this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(width, height);
        target.appendChild(this.renderer.domElement);

        const scene = new Scene();
        this.scene = scene;

        scene.add(christmasTree);

        const ambientLight = new AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 0.8);
        this.camera.add(pointLight);
        scene.add(this.camera);

        this.camera.position.z = 5;

        this.toys.push(new TreeToy());
        for(const toy of this.toys) {
            scene.add(toy.group);
        }

        this.animate();
    }

    private animate() {
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.animate.bind(this))
    }
}