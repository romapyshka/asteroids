import * as THREE from 'three';

export default class Asteroids {
    readonly object: THREE.Object3D;
    private FPS: number = 30;


    public constructor(scene: THREE.Scene) {
        // for (let i = 0; i < 6; i++) {
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
        scene.add(this.object);
    }
    // }

    public update() {
        this.object.position.x -= 3 * Math.sin(asteroidAngle) / this.FPS;
        this.object.position.z -= 3 * Math.cos(asteroidAngle) / this.FPS;
        // console.log(this.object.position.x, this.object.position.z);
        if(this.object.position.x > 15){
           this.object.position.x = -15;
        }
        if(this.object.position.x < -15){
            this.object.position.x = 15;
        }
        if(this.object.position.z > 15){
            this.object.position.z = -15;
        }
        if(this.object.position.z < -15){
            this.object.position.z = 15;
        }
    }
}

const asteroidAngle = angle(Math.round(random(-180,180)));

function random(min: number, max: number) {
        return Math.random() * (max - min) + min;
}

function angle(radian: number) {
    return radian *= Math.PI / 180;

}