import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AmbientLight,
    PointLight,
    Vector2,
    Raycaster,
  } from 'three';
import { christmasTree } from './objects/christmassTree';
import { TreeToy } from './objects/treeToy';
import { browser } from '$app/environment';

export class App {
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private scene: Scene;
    private pointer: Vector2 = new Vector2();
    private raycaster: Raycaster;

    private toys: TreeToy[] = [];

    constructor(target: HTMLElement) {
        if(!browser || typeof window === 'undefined') throw new Error('Something went wrong!')
        const {width, height} = target.getBoundingClientRect();
        this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(width, height);
        target.appendChild(this.renderer.domElement);
        this.raycaster = new Raycaster();
        window.addEventListener( 'pointermove', this.onPointerMove.bind(this) );
        const scene = new Scene();

        this.scene = scene;

        scene.add(christmasTree);
6
        const ambientLight = new AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 0.2);
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
        this.raycaster.setFromCamera(this.pointer, this.camera);

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.animate.bind(this))
    }


    private onPointerMove( event: MouseEvent ) {
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
}