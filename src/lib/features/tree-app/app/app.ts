import {PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Scene} from 'three'

export class App {
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private scene: Scene;
    private cube: Mesh;
    constructor(target: HTMLElement) {
        const {width, height} = target.getBoundingClientRect();
        this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(width, height);
        target.appendChild(this.renderer.domElement);

        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new Mesh( geometry, material );
        this.cube = cube;
        const scene = new Scene();
        this.scene = scene;
        scene.add( cube );

        this.camera.position.z = 5;

        this.animate();
    }

    private animate() {
        this.renderer.render(this.scene, this.camera);
        this.cube.rotateY(0.05)
        window.requestAnimationFrame(this.animate.bind(this))
    }
}