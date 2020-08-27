import * as THREE from 'three';

let ship: Ship;

class Ship{
    constructor(){

    }
    Draw() {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(-2,5,0),
            new THREE.Vector3(-5,-5,0),
            new THREE.Vector3(2,-5,0)
        );
        geometry.faces.push( new THREE.Face3(0, 1, 2));
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var spaceShip = new THREE.Mesh( geometry, material );
        scene.add( spaceShip );
        var animate = function () {
            requestAnimationFrame( animate );
            function keyboardInput(event: KeyboardEvent) {
                // PRESS LEFT ARROW
                if (event.keyCode == 32) {
                    spaceShip.position.y += 0.01;
                }
            }

            document.addEventListener('keydown', keyboardInput);


            renderer.render( scene, camera );
        };

        animate();
    }
    Update() {

    }
}
ship = new Ship();



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

ship.Draw();

camera.position.z = 100;


















