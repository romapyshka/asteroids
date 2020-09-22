import * as THREE from 'three';
import Game from "./game";
import GLTFLoader from "three-gltf-loader";

window.addEventListener("load", main);
async function main() {
    const loader = new GLTFLoader();
    async function load(path: string, x:number, y:number, z:number, rot: number) {
        return new Promise<THREE.Scene>(resolve => {
            loader.load(path, gltf => {
                let object = gltf.scene.children[0];
                object.scale.set(x,y,z);
                object.rotation.x += rot;
                resolve(gltf.scene);
            });
        });
    }
    const shipObject = await load('model/ship/scene.gltf', 0.01,0.01,0.01, 0);
    const asteroidObject = await load('model/asteroid/scene.gltf',0.01,0.01,0.01, 0);
    const bulletObject = await load('model/bullet/scene.gltf', 0.05,0.05,0.05, 1.5);



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

    const game = new Game(scene, shipObject, asteroidObject);

    game.startObjects(scene, asteroidObject);

    let lastTS: number = 0;

    function animate(ts: number) {
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
        let timeDelta = (ts - lastTS) / 1000;
        lastTS = ts;

        game.update(timeDelta, scene, bulletObject);
    }

    requestAnimationFrame(animate);
}