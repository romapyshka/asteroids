import * as THREE from 'three';
import Asteroid from "./asteroid";


export default class Bullet {
    readonly object: THREE.Object3D;
    private scene: THREE.Scene;
    private static geometry = new THREE.SphereGeometry(0.5, 100, 100 );
    private static material = new THREE.MeshStandardMaterial({color: "white",})

    public constructor(scene: THREE.Scene, position: THREE.Vector3, angle: number, model: THREE.Scene) {
        this.object = model.clone();
        // this.object = new THREE.Mesh(
        //     Bullet.geometry,
        //     Bullet. material,
        // );
        this.object.position.copy(position);
        this.object.rotation.y = angle;
        scene.add(this.object);
        this.scene = scene;
    }

    public update(timeDelta: number) {
        this.object.position.x += 15 * Math.sin(this.object.rotation.y) * timeDelta;
        this.object.position.z += 15 * Math.cos(this.object.rotation.y) * timeDelta;
    }

    public distanceCollision(asteroid: Asteroid){
        return Math.sqrt(Math.pow((asteroid.object.position.x - this.object.position.x), 2) + Math.pow((asteroid.object.position.z - this.object.position.z), 2));
    }

    public dispose(){
        this.scene.remove(this.object);
    }
}
