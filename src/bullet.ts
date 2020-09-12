import * as THREE from 'three';
import Asteroid from "./asteroid";

export default class Bullet {
    readonly object: THREE.Object3D;
    private scene: THREE.Scene;
    private static geometry = new THREE.SphereGeometry(0.5, 100, 100 );
    private static material = new THREE.MeshStandardMaterial({color: "white",});

    public constructor(scene: THREE.Scene, position: THREE.Vector3, angle: number) {
        this.object = new THREE.Mesh(
            Bullet.geometry,
            Bullet. material,
        );
        this.object.position.copy(position);
        this.object.rotation.y = angle;
        scene.add(this.object);
        this.scene = scene;
    }

    public update(timeDelta: number) {
        this.object.position.x -= 10 * Math.sin(this.object.rotation.y) * timeDelta;
        this.object.position.z -= 10 * Math.cos(this.object.rotation.y) * timeDelta;
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
        // const distanceBullet = Math.sqrt(Math.pow((asteroidPositionX - this.object.position.x), 2) + Math.pow((asteroidPositionZ - this.object.position.z), 2));
        // if (distanceBullet < 1.9) {
        //     this.scene.remove(this.object);
        //     this.scene.remove(asteroid);
        // }
    }
}
