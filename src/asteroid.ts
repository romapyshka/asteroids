import * as THREE from 'three';
import Ship from "./ship";

export default class Asteroid {
    readonly object: THREE.Scene;
    readonly asteroidAngle: number;
    private scene: THREE.Scene;
    // private static geometry = new THREE.SphereGeometry(1, 5, 5);
    // private static material = new THREE.MeshStandardMaterial({color: "white",});

    public constructor(scene: THREE.Scene, model: THREE.Scene, AsteroidX: number, AsteroidZ: number) {
        this.object = model.clone();
        this.asteroidAngle = angle(Math.round(random(-180, 180)));
        this.object.position.set(
            this.object.position.x = AsteroidX,
            this.object.position.y = 0,
            this.object.position.z = AsteroidZ,
        );
        scene.add(this.object);
        this.scene = scene;
    }

    public update(timeDelta: number) {
        this.object.position.x -= 5 * Math.sin(this.asteroidAngle) * timeDelta;
        this.object.position.z -= 5 * Math.cos(this.asteroidAngle) * timeDelta;
        if (this.object.position.x > 65) {
            this.object.position.x = -65;
        }
        if (this.object.position.x < -65) {
            this.object.position.x = 65;
        }
        if (this.object.position.z > 35) {
            this.object.position.z = -95;
        }
        if (this.object.position.z < -95) {
            this.object.position.z = 35;
        }
    }

    public distanceCollision(ship: Ship){
        return Math.sqrt(Math.pow((ship.object.position.x - this.object.position.x), 2) + Math.pow((ship.object.position.z - this.object.position.z), 2));
    }

    public dispose(){
        this.scene.remove(this.object);
    }
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function angle(radian: number) {
    return radian * Math.PI / 180;
}
