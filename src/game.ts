import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import Ship from "./ship";
import Asteroid from "./asteroid";
import Bullet from "./bullet";
import Health from "./health";
import {registerAndCreateEsmHooks} from "ts-node/dist/esm";

export default class Game {
    private space: boolean = false;
    private bullets: Array<Bullet> = [];
    private asteroids: Array<Asteroid> = [];
    private asteroidsSmall: Array<Asteroid> = [];
    private healthObjects: Array<Health> = [];
    private ship: Ship;
    private life: number;

    constructor(scene: THREE.Scene, modelShip: THREE.Scene,) {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.ship = new Ship(scene, modelShip);
        this.life = 3;
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

    public startObjects(scene: THREE.Scene, modelAsteroid: THREE.Scene, modelHealth: THREE.Scene) {
        this.asteroids = [
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(-60, -5), random(-60, -5)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
            new Asteroid(scene, modelAsteroid, random(5, 60), random(5, 60)),
        ];
        this.healthObjects = [
            new Health(scene, modelHealth, -7, -30),
            new Health(scene, modelHealth, 0, -30),
            new Health(scene, modelHealth, 7, -30),
        ];
    }

    public shootingProcess(timeDelta: number, scene: THREE.Scene, modelBullet: THREE.Scene) {
        if (this.space) {
            this.bullets.push(new Bullet(scene, this.ship.object.position, this.ship.object.rotation.y, modelBullet));
            this.space = false;
        }
        this.space = false;
    }

    public checkBordersForBullet(bullet: Bullet){
        if(bullet.object.position.x > 95){
            bullet.dispose();
        }
        if(bullet.object.position.x < -95){
            bullet.dispose();
        }
        if(bullet.object.position.z > 95){
            bullet.dispose();
        }
        if(bullet.object.position.z < -95){
            bullet.dispose();
        }
    }

    public smallAsteroidCheckCollision(scene: THREE.Scene){
        const asteroids = this.asteroidsSmall.slice(0);
        for (const asteroid of asteroids){
            const healthObjects = this.healthObjects.slice(0);
            for (const healthObject of healthObjects){
                if (asteroid.distanceCollision(this.ship) < 1.7){
                    asteroid.dispose();
                    this.asteroidsSmall.splice(this.asteroidsSmall.indexOf(asteroid), 1);
                    healthObject.dispose();
                    this.healthObjects.splice(this.healthObjects.indexOf(healthObject), 1);
                    this.ship.object.position.set(0,0,0);
                    this.life -= 1;
                    if (this.life < 1){
                        this.ship.dispose();
                    }
                    continue;
                }
                const bullets = this.bullets.slice(0);
                for (const bullet of bullets){
                    if (bullet.distanceCollision(asteroid) < 1.7) {
                        bullet.dispose();
                        this.bullets.splice(this.bullets.indexOf(bullet), 1);
                        asteroid.dispose();
                        this.asteroidsSmall.splice(this.asteroidsSmall.indexOf(asteroid), 1);
                        break;
                    }
                }
            }
        }
    }

    public update(timeDelta: number, scene: THREE.Scene, modelBullet: THREE.Scene, modelAsteroidSmall: THREE.Scene) {
        this.ship.update(timeDelta);


        this.shootingProcess(timeDelta, scene, modelBullet);
        for (const bullet of this.bullets) bullet.update(timeDelta);
        for (const bullet of this.bullets) this.checkBordersForBullet(bullet);
        for (const asteroid of this.asteroids) asteroid.update(timeDelta);
        for (const asteroid of this.asteroidsSmall) asteroid.update(timeDelta);

        const asteroids = this.asteroids.slice(0);
        for (const asteroid of asteroids){
            const healthObjects = this.healthObjects.slice(0);
            for (const healthObject of healthObjects) {
                if (asteroid.distanceCollision(this.ship) < 1.7) {
                    asteroid.dispose();
                    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
                    healthObject.dispose();
                    this.healthObjects.splice(this.healthObjects.indexOf(healthObject), 1);
                    this.asteroidsSmall.push(
                        new Asteroid(scene, modelAsteroidSmall, asteroid.object.position.x, asteroid.object.position.z),
                        new Asteroid(scene, modelAsteroidSmall, asteroid.object.position.x, asteroid.object.position.z)
                    );
                    this.ship.object.position.set(0, 0, 0);
                    this.life -= 1;
                    if (this.life == 0) {
                        this.ship.dispose();
                        textGameOver(scene);
                    }
                    continue;
                }
                const bullets = this.bullets.slice(0);
                for (const bullet of bullets) {
                    if (bullet.distanceCollision(asteroid) < 1.7) {
                        bullet.dispose();
                        this.bullets.splice(this.bullets.indexOf(bullet), 1);
                        asteroid.dispose();
                        this.asteroidsSmall.push(
                            new Asteroid(scene, modelAsteroidSmall, asteroid.object.position.x, asteroid.object.position.z),
                            new Asteroid(scene, modelAsteroidSmall, asteroid.object.position.x, asteroid.object.position.z)
                        );
                        this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
                        break;
                    }
                }
            }
        }
        this.smallAsteroidCheckCollision(scene);
    }
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function textGameOver(scene: THREE.Scene) {

    let loader = new THREE.FontLoader();
    loader.load( "Cookie_Regular.json", ( font ) =>
    {
        let shapes = font.generateShapes( 'GAME OVER', 3);

        let textShape = new THREE.BufferGeometry();
        let geometry = new THREE.ShapeGeometry( shapes );
        geometry.computeBoundingBox();

        let material = new THREE.MeshBasicMaterial( {
            color: 'white',
        } );

        geometry.translate( -13, 6, 0 );

        textShape.fromGeometry( geometry );
        let mesh = new THREE.Mesh( textShape, material );
        scene.add( mesh );
    } );
}
