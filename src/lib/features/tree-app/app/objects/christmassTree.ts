import { ConeGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial } from "three";

const christmasTree = new Group();

const coneGeometry1 = new ConeGeometry(1, 2, 8);
const coneMaterial1 = new MeshBasicMaterial({ color: 0x00ff00 });
const cone1 = new Mesh(coneGeometry1, coneMaterial1);
cone1.position.y = 0;
christmasTree.add(cone1);

const coneGeometry2 = new ConeGeometry(0.75, 2, 8);
const coneMaterial2 = new MeshBasicMaterial({ color: 0x00ff00 });
const cone2 = new Mesh(coneGeometry2, coneMaterial2);
cone2.position.y = 0.95;
christmasTree.add(cone2);

const coneGeometry3 = new ConeGeometry(0.5, 2, 8);
const coneMaterial3 = new MeshBasicMaterial({ color: 0x00ff00 });
const cone3 = new Mesh(coneGeometry3, coneMaterial3);
cone3.position.y = 2;
christmasTree.add(cone3);

const cylinderGeometry = new CylinderGeometry(0.15, 0.15, 1, 16);
const cylinderMaterial = new MeshBasicMaterial({ color: 0x996633 });
const cylinder = new Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.y = -1.5;
christmasTree.add(cylinder);

export {christmasTree}