import * as THREE from 'three';
import Ship from "./ship";

export default class Asteroid {
    readonly object: THREE.Scene;
    readonly asteroidAngle: number;
    private scene: THREE.Scene;
    // private static geometry = new THREE.SphereGeometry(1, 5, 5);
    // private static material = new THREE.MeshStandardMaterial({color: "white",});

    public constructor(scene: THREE.Scene, model: THREE.Scene) {
        this.object = model.clone();
        this.asteroidAngle = angle(Math.round(random(-180, 180)));
        this.object.position.set(
            this.object.position.x = random(-8, 8),
            this.object.position.z = 0,
            this.object.position.z = random(-8, 8),
        );
        scene.add(this.object);
        this.scene = scene;
    }

    public update(timeDelta: number) {
        this.object.position.x -= 3 * Math.sin(this.asteroidAngle) * timeDelta;
        this.object.position.z -= 3 * Math.cos(this.asteroidAngle) * timeDelta;
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
