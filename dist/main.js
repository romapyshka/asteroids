"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __importStar(require("three"));
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var keys = [];
var bulls = [];
var asteroids = [];
var score = 0;
var lives = 3;
var ship;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);
var Ship = /** @class */ (function () {
    function Ship() {
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
    Ship.prototype.Rotate = function (dir) {
        this.angle += this.rotateSpeed * dir;
    };
    // Update direction of the ship
    Ship.prototype.Update = function () {
        var radians = this.angle / Math.PI * 180;
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
    };
    // Draw the ship
    Ship.prototype.Draw = function () {
    };
    return Ship;
}());
var Bullet = /** @class */ (function () {
    function Bullet(angle) {
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
    Bullet.prototype.Update = function () {
        var radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    };
    // Draw the bullet
    Bullet.prototype.Draw = function () {
    };
    return Bullet;
}());
var Asteroid = /** @class */ (function () {
    function Asteroid(x, y, radius, level, collisionRadius) {
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
    Asteroid.prototype.Update = function () {
        var radians = this.angle / Math.PI * 180;
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
    };
    // Draw asteroids
    Asteroid.prototype.Draw = function () {
    };
    return Asteroid;
}());
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
var scene = new THREE.Scene();
renderer.render(scene, camera);
