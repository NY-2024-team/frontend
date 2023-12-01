import { browser } from '$app/environment';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial, SphereGeometry, Texture } from 'three';

export class TreeToy {
	public group: Group;

	constructor() {
        if(!browser) throw new Error('only for browsers!');
		this.group = this.createTreeToy();
	}

	private createTexture(): HTMLCanvasElement {
		const canvas = document.createElement('canvas');
		canvas.width = 1024;
		canvas.height = 1024
		const ctx = canvas.getContext('2d');
		if(!ctx) throw new Error("Cannot get canvas context!");

		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = 'blue';
		ctx.fillRect(0, (canvas.height / 2 ) - 40, canvas.width, 80)

		return canvas;
	}

	private createTreeToy(): Group {
		const toyGroup = new Group();

		const ballGeometry = new SphereGeometry(0.2, 16, 16);
		const ballMaterial = new MeshBasicMaterial({ color: 0xffff23 });
		const ball = new Mesh(ballGeometry, ballMaterial);
		ball.position.y = 0.66;
		ball.position.x = 0.5;
		ball.position.z = 0.5;

		const rectangleGeometry = new BoxGeometry(0.1, 0.1, 0.1);
		const rectangleMaterial = new MeshBasicMaterial({ color: 0xffff00 });
		const rectangle = new Mesh(rectangleGeometry, rectangleMaterial);
		rectangle.position.copy(ball.position);
		rectangle.position.y += 0.2;

		toyGroup.add(rectangle);

		const canvasTexture = this.createTexture();
		const texture = new Texture(canvasTexture)
		texture.needsUpdate = true;
		ball.material.map = texture;

		toyGroup.add(ball);

		toyGroup.rotateX(-0.25)

		return toyGroup;
	}
}
