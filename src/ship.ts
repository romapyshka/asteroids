import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

export default class Ship {
    private up: boolean = false;
    private right: boolean = false;
    private left: boolean = false;
    // readonly object: THREE.Object3D;
    readonly object: THREE.Scene;
    private scene: THREE.Scene;

    public constructor(scene: THREE.Scene, model: THREE.Scene) {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        // this.object = new THREE.Mesh(
        //     new THREE.BoxGeometry(2, 1,3),
        //     new THREE.MeshStandardMaterial({
        //         color: "white",
        //     }),
        // );
        this.object = model;
        scene.add(this.object);
        this.scene = scene;
    }

    public handleKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case "ArrowUp": this.up = true; break;
            case "ArrowRight": this.right = true; break;
            case "ArrowLeft": this.left = true; break;
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case "ArrowUp": this.up = false; break;
            case "ArrowRight": this.right = false; break;
            case "ArrowLeft": this.left = false; break;
        }
    }

    public update(timeDelta: number) {
        if(this.up){
           this.object.position.x += 5 * Math.sin(this.object.rotation.y) * timeDelta;
           this.object.position.z += 5 * Math.cos(this.object.rotation.y) * timeDelta;
        }
        if(this.left){
            this.object.rotation.y += 3 * timeDelta;
        }
        if(this.right){
            this.object.rotation.y -= 3 * timeDelta;
        }
    }
}
//
// function main() {
//     fs.loadFile('./', function (file) {
//         console.log(file);
//         fs.loadFile('./', function (file1) {
//             console.log(file1);
//         });
//     });
//
//     console.log('Done');
// }
//
// function main() {
//     const promise1 = fs.loadFile('./');
//     promise1.then(function (file) {
//         console.log(file);
//         const promise2 = fs.loadFile('./');
//         promise2.then(function (file1){
//             console.log(file1);
//         });
//     });
//
//     console.log('Done');
// }
//
// async function main() {
//     const promise1 = fs.loadFile('./');
//     const file1 = await promise1;
//     const promise2 = fs.loadFile('./');
//     const file2 = await promise2;
//     console.log("Done");
// }
//
//
//
//
