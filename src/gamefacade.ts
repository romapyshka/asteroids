import * as THREE from 'three';
import Ship from "./ship";
import Asteroid from "./asteroid";
import Bullet from "./bullet";


export default class GameFacade {
    private space: boolean = false;
    private bullets: Array<Bullet> = [];
    private asteroids: Array<Asteroid> = [];
    private ship: Ship;


    constructor(scene: THREE.Scene) {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.ship = new Ship(scene);
    }

    public handleKeyDown(event: KeyboardEvent) {
        if (event.code === "Space") {
            this.space = true;
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        if (event.code === "Space") {
            this.space = false;
        }
    }

    public shoot(timeDelta: number, scene: THREE.Scene) {
        if (this.space) {
            this.bullets.push(new Bullet(scene, this.ship.object.position, this.ship.object.rotation.y,));
        }
        for (const bullet of this.bullets) bullet.update(timeDelta);
    }

    public startObjects(scene: THREE.Scene) {
        this.asteroids = [
            new Asteroid(scene),
            new Asteroid(scene),
            new Asteroid(scene),
            new Asteroid(scene),
            new Asteroid(scene),
            new Asteroid(scene),
        ];
    }

    // public checkColision(scene: THREE.Scene, objectPositionX: number, objectPositionZ: number, object: THREE.Object3D){
    //    // for(let i = 0; i > this.asteroids.length; i++){
    //        const distanceShip = Math.sqrt(Math.pow((this.ship.object.position.x - objectPositionX), 2) + Math.pow((this.ship.object.position.z - objectPositionX), 2));
    //        if (distanceShip < 1.9) {
    //            scene.remove(object);
    //            // this.asteroids.pop();
    //        // }
    //     }
    // }

    public update(timeDelta: number, scene: THREE.Scene) {
        this.ship.update(timeDelta);

        this.shoot(timeDelta, scene);

        for (const asteroid of this.asteroids) asteroid.update(timeDelta, this.ship.object.position.x, this.ship.object.position.z,);
        for (const asteroid of this.asteroids) asteroid.checkCollision(scene, this.ship.object.position.x, this.ship.object.position.z);
    }
}