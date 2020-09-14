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

    public update(timeDelta: number, scene: THREE.Scene) {
        this.ship.update(timeDelta);

        this.shoot(timeDelta, scene);

        for (const asteroid of this.asteroids) asteroid.update(timeDelta, this.ship.object.position.x, this.ship.object.position.z,);
        // for (const asteroid of this.asteroids) {
        //     asteroid.checkCollision(scene, this.ship.object.position.x, this.ship.object.position.z);
        //     // this.asteroids.splice()
        //     console.log(this.asteroids.length);
        // }
        for (const bullet of this.bullets) bullet.checkCollision(scene, this.asteroids[0].object.position.x, this.asteroids[0].object.position.z, this.asteroids[0].object);
        for (const bullet of this.bullets) bullet.checkCollision(scene, this.asteroids[1].object.position.x, this.asteroids[1].object.position.z, this.asteroids[1].object);
        for (const bullet of this.bullets) bullet.checkCollision(scene, this.asteroids[2].object.position.x, this.asteroids[2].object.position.z, this.asteroids[2].object);
        for (const bullet of this.bullets) bullet.checkCollision(scene, this.asteroids[3].object.position.x, this.asteroids[3].object.position.z, this.asteroids[3].object);
        for (const bullet of this.bullets) bullet.checkCollision(scene, this.asteroids[4].object.position.x, this.asteroids[4].object.position.z, this.asteroids[4].object);
        for (const bullet of this.bullets) bullet.checkCollision(scene, this.asteroids[5].object.position.x, this.asteroids[5].object.position.z, this.asteroids[5].object);
    }
}