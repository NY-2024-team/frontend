import { browser } from '$app/environment';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

export class TreeToy {
	public group: Group;

	constructor() {
        if(!browser) throw new Error('only for browsers!');
		this.group = this.createTreeToy();
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

		toyGroup.add(ball);


		return toyGroup;
	}
}
