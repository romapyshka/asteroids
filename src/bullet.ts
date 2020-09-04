import * as THREE from 'three';
import Ship from "./ship";


export default class Bullet {
    readonly object: THREE.Object3D;
    private space: boolean = false;

    public constructor(scene: THREE.Scene) {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        const ship = new Ship(scene);
        this.object = new THREE.Mesh(
            new THREE.SphereGeometry(1, 100, 100 ),
            new THREE.MeshStandardMaterial({
                color: "white",
            }),
        );
        this.object.position.copy(ship.object.position);
        scene.add(this.object);
    }

    public handleKeyDown(event: KeyboardEvent) {
        if (event.code === "Space") {
            this.space = true;
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        if (event.code === "Space") {
            this.space = false;
        }
    }

    public update(scene: THREE.Scene) {
        if(this.space){
            new Bullet(scene);
        }
        if(this.object.position.x > 15){
            scene.remove(this.object);
        }
        if(this.object.position.x < -15){
            scene.remove(this.object);
        }
        if(this.object.position.z > 15){
            scene.remove(this.object);
        }
        if(this.object.position.z < -15){
            scene.remove(this.object);
        }
    }
}
