import * as THREE from 'three';

export default class Asteroids {
    readonly object: THREE.Object3D | undefined;
    private FPS: number = 30;


    public constructor(scene: THREE.Scene) {
        for (let i = 0; i < 6; i++) {
            this.object = new THREE.Mesh(
            new THREE.SphereGeometry(1, 5, 5 ),
            new THREE.MeshStandardMaterial({
                color: "white",
            }),
        );
        this.object.position.set(
            this.object.position.x = random(-8, 8),
            this.object.position.z = 0,
            this.object.position.z = random(-8, 8),
        );
        scene.add(this.object);}
    }

    // public update() {
    //     this.object.position.x -= 2 * Math.sin(angle(random(0, 360))) / this.FPS;
    //     this.object.position.z -= 2 * Math.cos(angle(random(0, 360))) / this.FPS;
    // }
}

function random(min: number, max: number) {
        return Math.random() * (max - min) + min;
}

function angle(radian: number) {
    return radian *= Math.PI / 180;

}

