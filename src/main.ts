import * as THREE from 'three';
import Ship from "./ship";
import Asteroid from "./asteroid";
import Bullet from "./bullet"
import gamefacade from "./gamefacade";
import GameFacade from "./gamefacade";

window.addEventListener("load", main);
function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    camera.position.z = 20;
    camera.position.y = 20;
    camera.rotation.x = -45 * Math.PI / 180;

    const light = new THREE.PointLight("white", 1, 100);
    light.position.set(0,10,0);
    scene.add(light);

    const ambient = new THREE.AmbientLight("white", 0.2);
    scene.add(ambient);

    const gameFacade = new GameFacade(scene);

    gameFacade.startObjects(scene);

    let lastTS: number = 0;

    function animate(ts: number) {
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
        let timeDelta = (ts - lastTS) / 1000;
        lastTS = ts;

        gameFacade.update(timeDelta, scene);
    }

    requestAnimationFrame(animate);
}
