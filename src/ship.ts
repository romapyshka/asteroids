import * as THREE from 'three';
import Asteroids from "./asteroids";

export default class Ship {
    private up: boolean = false;
    private right: boolean = false;
    private left: boolean = false;
    readonly object: THREE.Object3D;

    public constructor(scene: THREE.Scene) {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1,3),
            new THREE.MeshStandardMaterial({
                color: "white",
            }),
        );
        scene.add(this.object);
    }

    public handleKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case "ArrowUp": this.up = true; break;
            case "ArrowRight": this.right = true; break;
            case "ArrowLeft": this.left = true; break;
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case "ArrowUp": this.up = false; break;
            case "ArrowRight": this.right = false; break;
            case "ArrowLeft": this.left = false; break;
        }
    }

    public update(timeDelta: number) {
        if(this.up){
           this.object.position.x += 5 * Math.sin(this.object.rotation.y) * timeDelta;
           this.object.position.z += 5 * Math.cos(this.object.rotation.y) * timeDelta;
        }
        if(this.left){
            this.object.rotation.y += 3 * timeDelta;
        }
        if(this.right){
            this.object.rotation.y -= 3 * timeDelta;
        }
    }
}
