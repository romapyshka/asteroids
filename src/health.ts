import * as THREE from 'three';

export default class Health {
    private object: THREE.Scene;
    private scene: THREE.Scene;

    constructor(scene: THREE.Scene, model: THREE.Scene, HealthX: number, HealthZ: number){
        this.object = model.clone();
        this.object.position.set(
            this.object.position.x = HealthX,
            this.object.position.y = 12,
            this.object.position.z = HealthZ,
        );
        scene.add(this.object);
        this.scene = scene;
    }

    public dispose(){
        this.scene.remove(this.object);
    }
}