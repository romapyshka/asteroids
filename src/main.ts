import * as THREE from 'three';

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let keys = [];
let bulls = [];
let asteroids = [];
let score = 0;
let lives = 3;
let ship : Ship;


var renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight);
document.body.appendChild( renderer.domElement );



class Ship {
    visible: boolean;
    x: number;
    y: number;
    movingForward: boolean;
    speed: number;
    velX: number;
    velY: number;
    rotateSpeed: number;
    radius: number;
    angle: number;
    strokeColor: string;
    noseX: number;
    noseY: number;
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }
    Rotate(dir: number) {
        this.angle += this.rotateSpeed * dir;
    }
    // Update direction of the ship
    Update() {
        let radians = this.angle / Math.PI * 180;
        if (this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }

        // if (this.x < this.radius) {
        //     this.x = canvas.width;
        // }
        // if (this.x > canvas.width) {
        //     this.x = this.radius;
        // }
        // if (this.y < this.radius) {
        //     this.y = canvas.height;
        // }
        // if (this.y > canvas.height) {
        //     this.y = this.radius;
        // }

        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x -= this.velX;
        this.y -= this.velY;
    }
    // Draw the ship
    Draw() {

    }
}

class Bullet{
    visible: boolean;
    x: number;
    y: any;
    angle: number;
    height: number;
    width: number;
    speed: number;
    velY: number;
    velX: number;
    constructor(angle: number) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }
    // Draw the bullet
    Draw(){

    }
}

class Asteroid{
    private visible: boolean;
    private x: number;
    private y: number;
    private speed: number;
    private radius: number;
    private angle: number;
    private strokeColor: string;
    private collisionRadius: number;
    private level: number;
    constructor(x: number, y: number, radius: number, level: number, collisionRadius: number) {
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 3;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        this.level = level || 1;
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        // if (this.x < this.radius) {
        //     this.x = canvas.width;
        // }
        // if (this.x > canvas.width) {
        //     this.x = this.radius;
        // }
        // if (this.y < this.radius) {
        //     this.y = canvas.height;
        // }
        // if (this.y > canvas.height) {
        //     this.y = this.radius;
        // }
    }
    // Draw asteroids
    Draw(){

    }
}









var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var scene = new THREE.Scene();







renderer.render( scene, camera );