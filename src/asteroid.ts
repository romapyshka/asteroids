import * as THREE from 'three';
import Bullet from "./bullet";

export default class Asteroid {
    readonly object: THREE.Object3D;
    readonly asteroidAngle: number;
    private scene: THREE.Scene;
    private static geometry = new THREE.SphereGeometry(1, 5, 5);
    private static material = new THREE.MeshStandardMaterial({color: "white",});

    public constructor(scene: THREE.Scene) {
        this.object = new THREE.Mesh(
            Asteroid.geometry,
            Asteroid.material,
        );
        this.asteroidAngle = angle(Math.round(random(-180, 180)));
        this.object.position.set(
            this.object.position.x = random(-8, 8),
            this.object.position.z = 0,
            this.object.position.z = random(-8, 8),
        );
        scene.add(this.object);
        this.scene = scene;
    }

    public update(timeDelta: number, shipPositionX: number, shipPositionZ: number,) {
        this.object.position.x -= 3 * Math.sin(this.asteroidAngle) * timeDelta;
        this.object.position.z -= 3 * Math.cos(this.asteroidAngle) * timeDelta;
        // console.log(this.object.position.x, this.object.position.z);
        // console.log(asteroidAngle);
        if (this.object.position.x > 15) {
            this.object.position.x = -15;
        }
        if (this.object.position.x < -15) {
            this.object.position.x = 15;
        }
        if (this.object.position.z > 15) {
            this.object.position.z = -15;
        }
        if (this.object.position.z < -15) {
            this.object.position.z = 15;
        }
    }

    public checkCollision(scene: THREE.Scene, shipPositionX: number, shipPositionZ: number){
        const distanceShip = Math.sqrt(Math.pow((shipPositionX - this.object.position.x), 2) + Math.pow((shipPositionZ - this.object.position.z), 2));
        if (distanceShip < 1.9) {
            scene.remove(this.object);
            return true;
        }
    }
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function angle(radian: number) {
    return radian * Math.PI / 180;
}
