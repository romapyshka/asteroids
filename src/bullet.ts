import * as THREE from 'three';
import Ship from "./ship";
import ship from "./ship";


export default class Bullet {
    readonly object: THREE.Object3D;
    private space: boolean = false;
    private scene!: THREE.Scene;

    public constructor(scene: THREE.Scene) {
        this.object = new THREE.Mesh(
            new THREE.SphereGeometry(1, 100, 100 ),
            new THREE.MeshStandardMaterial({
                color: "white",
            }),
        );
        // this.object.position.copy(shipPosition);
        this.object.position.set(1, 1, 1);
        scene.add(this.object);
    }

    public update() {
        if(this.object.position.x > 15){
            this.scene.remove(this.object);
        }
        if(this.object.position.x < -15){
            this.scene.remove(this.object);
        }
        if(this.object.position.z > 15){
            this.scene.remove(this.object);
        }
        if(this.object.position.z < -15){
           this.scene.remove(this.object);
        }
    }
}
