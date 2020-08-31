import * as THREE from 'three';

export default class Ship {
    private up: boolean = false;
    private down: boolean = false;
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
            case "ArrowDown": this.down = true; break;
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case "ArrowUp": this.up = false; break;
            case "ArrowDown": this.down = false; break;
        }
    }

    public update() {
        if(this.up){
            this.object.position.set(
                this.object.position.x + 0.1,
                   this.object.position.y,
                   this.object.position.z,
            );
        }
    }
}