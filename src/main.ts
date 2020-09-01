import * as THREE from 'three';
import Ship from "./ship";
import Asteroids from "./asteroids";

window.addEventListener("load", main);
function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    camera.position.z = 10;
    camera.position.y = 10;
    camera.rotation.x = -45 * Math.PI / 180;

    const light = new THREE.PointLight("white", 1, 100);
    light.position.set(0,10,0);
    scene.add(light);

    const ambient = new THREE.AmbientLight("white", 0.2);
    scene.add(ambient);

    const ship = new Ship(scene);
    const asteroids = new Asteroids(scene);

    let lastTS: number = 0;

    function animate(ts: number) {
        ship.update();
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
            let timeDelta = (ts - lastTS) / 1000;
            lastTS = ts;
    }

    requestAnimationFrame(animate);
}











//
// let ship: Ship;
// class Ship{
//     speed: number;
//     velX: number;
//     velY: number;
//     radius: number;
//     angle: number;
//     constructor(){
//         this.speed = 0.1;
//         this.velX = 0;
//         this.velY = 0;
//         this.radius = 15;
//         this.angle = 0;
//     }
//     Draw() {
//         var radians = this.angle / Math.PI * 180;
//         var geometry = new THREE.Geometry();
//         geometry.vertices.push(
//             new THREE.Vector3(-2,5,0),
//             new THREE.Vector3(-5,-5,0),
//             new THREE.Vector3(2,-5,0)
//         );
//         geometry.faces.push( new THREE.Face3(0, 1, 2));
//         var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
//         var spaceShip = new THREE.Mesh( geometry, material );
//         scene.add( spaceShip );
//
//
//        const f = () => {
//
//        };
//        function animate() {
//             requestAnimationFrame( animate );
//             function keyboardInput(event: KeyboardEvent) {
//                 // PRESS W
//                 if (event.keyCode == 87) {
//                     spaceShip.position.x += 0.01;
//                 }
//                 if(event.keyCode == 65) {
//                     spaceShip.rotation.z -= 0.01;
//                     spaceShip.rotation.y -= 0.01;
//                 }
//             }
//
//             document.addEventListener('keydown', keyboardInput);
//             renderer.render( scene, camera );
//         }
//
//         animate();
//     }
//
//
// }
// ship = new Ship();










