import * as THREE from 'three';

export default class Ship {
    private up: boolean = false;
    private right: boolean = false;
    private left: boolean = false;
    private space: boolean = false;
    readonly object: THREE.Object3D;
    private clock = new THREE.Clock();
    private angle: number = 0;
    private FPS: number = 30;

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
            case "Space": this.space = true; break;
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case "ArrowUp": this.up = false; break;
            case "ArrowRight": this.right = false; break;
            case "ArrowLeft": this.left = false; break;
            case "Space": this.space = false; break;
        }
    }

    public shoot(scene: THREE.Scene) {
        const bullet = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 100, 100 ),
            new THREE.MeshStandardMaterial({
                color: "white",
            }),
        );
        scene.add(bullet);
    }

    public update() {
        if(this.up){
           this.object.position.x -= 3 * Math.sin(this.angle) / this.FPS;
           this.object.position.z -= 3 * Math.cos(this.angle) / this.FPS;
        }
        if(this.left){
            this.object.rotation.y += 5 * this.clock.getDelta();
            this.angle += 5 * Math.PI / 180;
        }
        if(this.right){
            this.object.rotation.y -= 5 * this.clock.getDelta();
            this.angle -= 5 * Math.PI / 180;
        }
    }
}


//
// public move() {
//     this.angle += this.rot;
//
//     this.object.position.x += this.trust.x;
//     this.object.position.z += this.trust.y;
//
//     if(this.trusting == true){
//         this.trust.x += this.shipTrust * Math.cos(this.angle) / this.FPS;
//         this.trust.y -= this.shipTrust * Math.sin(this.angle) / this.FPS;
//     } else {
//         this.trust.x += this.shipFriction * Math.cos(this.angle) / this.FPS;
//         this.trust.y -= this.shipFriction * Math.sin(this.angle) / this.FPS;
//     }
//
// }
//
// public update() {
//     if(this.up){
//         this.trusting = true;
//         this.move();
//     }
//     if(this.left){
//         this.object.rotation.y = this.turnSpeed / 180 * Math.PI / this.FPS;
//     }
//     if(this.right){
//         this.object.rotation.y = -this.turnSpeed / 180 * Math.PI / this.FPS;
//     }
// }