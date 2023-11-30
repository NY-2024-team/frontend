import { browser } from '$app/environment';
import { CylinderGeometry, Group, Mesh, MeshStandardMaterial } from 'three';

export class Ground {
	public group: Group;

	constructor() {
		if (!browser) throw new Error('only for browsers!');
		this.group = this.createFloor();
	}

	private createFloor(): Group {
		const floorGroup = new Group();

		const floorGeometry = new CylinderGeometry(50, 50, 0.2); // Ширина, высота, глубина
		const floorMaterial = new MeshStandardMaterial({ color: 0xffffff });
		const floor = new Mesh(floorGeometry, floorMaterial);
		floor.position.y = -2; // Поднимаем немного выше, чтобы не пересекалась с другими объектами

		floorGroup.add(floor);

		return floorGroup;
	}
}
