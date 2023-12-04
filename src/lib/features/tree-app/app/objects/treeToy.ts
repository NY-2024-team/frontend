import { browser } from '$app/environment';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial, SphereGeometry, Texture } from 'three';
import { drawTriangleWave } from '../toy-textures/triangle-line';

type BaseColor = 'red' | 'blue';
type LineColor = 'pink' | 'green' | 'yellow'
export type Patterns = 'line_triangle' | 'line'

export interface TreeToyProperties {
	baseColor: BaseColor;
	lineColor: LineColor;
	pattern: Patterns
}

const defaultToyProps: TreeToyProperties = {
	baseColor: 'blue',
	lineColor: 'green',
	pattern: 'line_triangle'
}

export class TreeToy {
	public group: Group;
	private ballMesh: Mesh;

	constructor() {
        if(!browser) throw new Error('only for browsers!');
		const {ball, group} = this.createTreeToy();
		this.ballMesh = ball;
		this.group = group;
	}

	public createTexture(props: TreeToyProperties): HTMLCanvasElement {
		const canvas = document.createElement('canvas');
		canvas.width = 2048;
		canvas.height = 2048
		const ctx = canvas.getContext('2d');
		if(!ctx) throw new Error("Cannot get canvas context!");

		ctx.fillStyle = props.baseColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		drawTriangleWave(ctx, 20, 100, props.lineColor, 10)

		return canvas;
	}

	public download(canvas: HTMLCanvasElement) {
		const link = document.createElement('a');
		link.download = 'texture.png';
		link.href = canvas.toDataURL()
		link.click();
	  }

	public updateTexture(props: TreeToyProperties, downloadTexture = false) {
		const canvasTexture = this.createTexture(props);
		const texture = new Texture(canvasTexture);
		texture.needsUpdate = true;

		if(downloadTexture) this.download(canvasTexture)

		if(this.ballMesh.material instanceof MeshBasicMaterial) {
			this.ballMesh.material.map = texture;
		}
	}

	private createTreeToy(): {group: Group, ball: Mesh} {
		const toyGroup = new Group();

		const ballGeometry = new SphereGeometry(0.2, 16, 16);
		const ballMaterial = new MeshBasicMaterial({ color: 0xffff23 });
		const ball = new Mesh(ballGeometry, ballMaterial);
		toyGroup.position.y = 0.66;
		toyGroup.position.x = 0.5;
		toyGroup.position.z = 0.5;

		const rectangleGeometry = new BoxGeometry(0.1, 0.1, 0.1);
		const rectangleMaterial = new MeshBasicMaterial({ color: 0xffff00 });
		const rectangle = new Mesh(rectangleGeometry, rectangleMaterial);
		rectangle.position.copy(ball.position);
		rectangle.position.y += 0.2;

		toyGroup.add(rectangle);

		const canvasTexture = this.createTexture(defaultToyProps);
		const texture = new Texture(canvasTexture)
		texture.needsUpdate = true;
		ball.material.map = texture;

		toyGroup.add(ball);

		toyGroup.rotateX(-0.25)

		return {group: toyGroup, ball};
	}
}
