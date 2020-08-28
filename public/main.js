function main(){

    var Space_Down = false;
    var Forward_Down = false;
    var Backward_Down = false;
    var Left_Down = false;
    var Right_Down = false;
    var Y_Down = false;
    var Space_Held = false;


    var Lives = 3;
    var LivesLeft = [];


    var scene = new THREE.Scene();


    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    var viewportSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    var margins = window.innerWidth > window.innerHeight ? window.innerWidth - viewportSize : window.innerHeight - viewportSize;
    var leftmargin = margins / 2;


    renderer.setViewport(leftmargin, 0, viewportSize, viewportSize);


    var camera = new THREE.OrthographicCamera( viewportSize / - 2, viewportSize / 2, viewportSize / 2, viewportSize / - 2, 1, 1000 );


    camera.position.z = 1000;
    camera.position.x = 0;
    camera.position.y = 0;


    var blackMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var background = new THREE.Mesh( new THREE.PlaneGeometry( viewportSize, viewportSize, 1, 1 ), blackMaterial );
    background.position.set( 0, 0, 0 );
    scene.add( background );



    var spaceShip = new SpaceShip(scene, Date.now(), viewportSize, 2.5, true);
    spaceShip.setInvincible();
    var Asteroids = [];
    var seedDate = Date.now();
    for(var i = 0; i < 5; i ++){
        var a = new Asteroid(scene,5,2,viewportSize,seedDate);
        a.randomStart();
        Asteroids.push(a);
    }



    var activeBullets = [];


    function render () {
        try{



            var time = Date.now();
            var invincible = spaceShip.getInvincible(time);

            if(Space_Down){

                var newBullet = spaceShip.shoot(time, Space_Held);

                if (newBullet != undefined){
                    activeBullets.push(newBullet);
                }

                Space_Held = true;
            }
            else{
                Space_Held = false;
            }
            if(Left_Down){
                spaceShip.rotateLeft(time);
            }
            if(Right_Down){
                spaceShip.rotateRight(time);
            }
            if(Forward_Down){
                spaceShip.goForward(time)
            }
            if(Y_Down){

                spaceShip.setPosition(new THREE.Vector3(0,0,750));
                spaceShip.setRotation(new THREE.Vector3(0,0,0));
                spaceShip.setMomentum(new THREE.Vector3(0,0,0));
                spaceShip.setInvincible();
                invincible = true;

                var asteroids = []
                for(var i = 0; i < 5; i ++){
                    var a = new Asteroid(scene,5,2,viewportSize,time - 1);
                    a.randomStart();
                    Asteroids.push(a);
                }
                Asteroids = Asteroids.concat(asteroids);


                
            }


            spaceShip.draw(time);

            for(var i = 0; i < Asteroids.length; i ++){

                Asteroids[i].draw(time);
            }

            var tempBullets = [];
            for(var i = 0; i < activeBullets.length; i ++){
                var bullet = activeBullets[i];
                var destroy = false;
                var asteroidsToAdd = [];


                bullet.move();
                tempBullets.push(bullet);
                Asteroids = Asteroids.concat(asteroidsToAdd);
                if(!bullet.checkTime(time)){
                    bullet.destroy()
                }
            }
        }
        catch(Error){
            alert(Error);
        }


        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();



    function onDocumentKeyDown( event ) {

        switch( event.keyCode ) {
            case 32: //' '
                Space_Down = true;
                break;
            case 38: //'up arrow'
                Forward_Down = true;
                break;
            case 40: //'down arrow'
                Back_Down = true;
                break;
            case 37: //'left arrow'
                Left_Down = true;
                break;
            case 39: //'right arrow'
                Right_Down = true;
                break;
            case 89: // 'y'
                Y_Down = true;
                break;
        }
    }

    function onDocumentKeyUp( event ) {
        switch( event.keyCode ) {
            case 32: //' '
                Space_Down = false;
                break;
            case 38: //'up arrow'
                Forward_Down = false;
                break;
            case 40: //'down arrow'
                Back_Down = false;
                break;
            case 37: //'left arrow'
                Left_Down = false;
                break;
            case 39: //'right arrow'
                Right_Down = false;
                break;
            case 89: // 'y'
                Y_Down = false;
                break;
        }
    }

    document.addEventListener( 'keydown', onDocumentKeyDown, false );
    document.addEventListener( 'keyup', onDocumentKeyUp, false );

}


main();

function Asteroid(scene, scale, difficulty, viewportSize, time, audioContext){

    try{

        var asteroidMaterial = new THREE.LineBasicMaterial( { color: 0xffffff} );

        var asteroid1Geometry = new THREE.Geometry();

        var xDMod = Math.random() > .5 ? 1 : -1;
        var yDMod = Math.random() > .5 ? 1 : -1;
        var asteroidVector = new THREE.Vector3(Math.random() * difficulty * 75 * xDMod, Math.random() * difficulty * 75 * yDMod, 0);

        this.position = new THREE.Vector3();
        this.Difficulty = difficulty;
        var that = this;



        var lastTime = time;
        var timeDelta;
        function updateTime(t){
            if(lastTime == t) return;
            else{
                timeDelta = (t - lastTime) / 1000;
                lastTime = t;
            }
        }


        asteroid1Geometry.vertices.push(new THREE.Vector3(-3,-3,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(-4,0,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(-3,4,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(-2,3,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(1,4,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(4,2,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(1,0,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(4,-1,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(2,-4,0));
        asteroid1Geometry.vertices.push(new THREE.Vector3(-3,-3,0));


        var mainAsteroid = new THREE.Line(asteroid1Geometry, asteroidMaterial, THREE.LineStrip);


        var bulletHitboxVertices = [];
        bulletHitboxVertices.push(new THREE.Vector3(-4 * scale,-4 * scale,0));
        bulletHitboxVertices.push(new THREE.Vector3(-4 * scale,4 * scale,0));
        bulletHitboxVertices.push(new THREE.Vector3(4 * scale,4 * scale,0));
        bulletHitboxVertices.push(new THREE.Vector3(4 * scale,-4 * scale,0));


        this.checkCollision = function(points){
            for(var i = 0; i < points.length; i ++){
                //check vertical plane of hitbox
                if(points[i].y < bulletHitboxVertices[1].y && points[i].y > bulletHitboxVertices[0].y ){
                    //check horizontal plane of the hitbox
                    if(points[i].x < bulletHitboxVertices[2].x && points[i].x > bulletHitboxVertices[0].x ) {
                        return true;
                    }
                }
            }
            return false;
        }

        this.randomStart = function(){
            var startX = 0;
            var startY = 0;
            while(that.checkCollision([new THREE.Vector3(10, 10, 0)])){
                startX = Math.random() * viewportSize;
                startY = Math.random() * viewportSize;
                startX = startX > viewportSize / 2 ? (startX - (viewportSize/2)) * -1 : startX;
                startY = startY > viewportSize / 2 ? (startY - (viewportSize/2)) * -1 : startY;

                bulletHitboxVertices = [];
                bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(-4 * scale) + startY,0));
                bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(4 * scale) + startY,0));
                bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(4 * scale) + startY,0));
                bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(-4 * scale) + startY,0));

                mainAsteroid.position.set(startX, startY, 750);
                that.position.copy(mainAsteroid.position);
            }

        }

        this.fixedStart = function(location){
            var startX = location.x;
            var startY = location.y;

            bulletHitboxVertices = [];
            bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(-4 * scale) + startY,0));
            bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(4 * scale) + startY,0));
            bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(4 * scale) + startY,0));
            bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(-4 * scale) + startY,0));

            mainAsteroid.position.set(startX, startY, 750);
            if(isNaN(mainAsteroid.position.x)) alert("bFUCK");
            that.position.copy(mainAsteroid.position);
            if(isNaN(that.position.x)) alert("cFUCK");
        }


        if(isNaN(mainAsteroid.position.x)) alert("aFUCK");
        mainAsteroid.scale.set(scale,scale,1);
        scene.add(mainAsteroid);


        function setHitboxXY(xValue, yValue){
            bulletHitboxVertices = [];
            bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + xValue,(-4 * scale) + yValue,0));
            bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + xValue,(4 * scale) + yValue,0));
            bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + xValue,(4 * scale) + yValue,0));
            bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + xValue,(-4 * scale) + yValue,0));
        }

        this.draw = function(t){

            updateTime(t);
            var vec = new THREE.Vector3();
            vec.copy(asteroidVector);
            vec.multiplyScalar(timeDelta);
            mainAsteroid.position.add(vec);
            that.position.copy(mainAsteroid.position);


            if(mainAsteroid.position.x < viewportSize / -2){
                mainAsteroid.position.x = viewportSize / 2;
            }
            if(mainAsteroid.position.x > viewportSize / 2){
                mainAsteroid.position.x = viewportSize / -2;
            }
            if(mainAsteroid.position.y < viewportSize / -2){
                mainAsteroid.position.y = viewportSize / 2;
            }
            if(mainAsteroid.position.y > viewportSize / 2){
                mainAsteroid.position.y = viewportSize / -2;
            }

            setHitboxXY(mainAsteroid.position.x, mainAsteroid.position.y);
        }

        this.destroy = function(){
            scene.remove(mainAsteroid);
            var childAsteroids = [];

            if(scale == 5){
                var seedDate = Date.now();
                for(var i = 0; i < 3; i ++){
                    var a = new Asteroid(scene,3,that.Difficulty,viewportSize,seedDate);
                    a.fixedStart(that.position)
                    childAsteroids.push(a);
                }
            }


            return childAsteroids;
        }
    }
    catch(err){
        alert(err);
    }

}

function SpaceShip(scene, time, viewportSize, scale, player){
    "use strict";



    var shipMomentum = new THREE.Vector3(0,0,0);

    var invincible = false;
    var invincibleTime = 0;


    var lastTime = time;
    var timeDelta;
    function updateTime(t){
        if(lastTime == t) return;
        else{
            timeDelta = (t - lastTime) / 1000;
            lastTime = t;
        }
    }





    var lastShot = 0;


    var shipMaterial = new THREE.LineBasicMaterial( { color: 0xffffff} );

    var shipGeometry = new THREE.Geometry();




    shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
    shipGeometry.vertices.push(new THREE.Vector3(2,-3,0));
    shipGeometry.vertices.push(new THREE.Vector3(-2,-3,0));
    shipGeometry.vertices.push(new THREE.Vector3(0,3,0));



    var spaceShip = new THREE.Line(shipGeometry, shipMaterial, THREE.LineStrip);


    spaceShip.position.set(0,0,750);
    spaceShip.scale.set(scale,scale,1);



    scene.add(spaceShip);



    this.setPosition = function(v){
        spaceShip.position.set(v.x,v.y,v.z);
    }
    this.setRotation = function(v){
        spaceShip.rotation.z = v.z;
    }
    this.setMomentum = function(v){
        shipMomentum.copy(v);
    }
    this.clear = function(){
        scene.remove(spaceShip);
    }

    this.setInvincible = function(){
        invincible = true;
    }
    this.getInvincible = function(t){
        updateTime(t);
        if(invincible){
            invincibleTime += timeDelta;
            if(invincibleTime >= 5){
                invincible = false;
                invincibleTime = 0;
            }
        }
        return invincible;
    }


    this.rotateLeft = function(t){
        updateTime(t);
        spaceShip.rotation.z += 6 * timeDelta;
    }

    this.rotateRight = function(t){
        updateTime(t);
        spaceShip.rotation.z -= 6 * timeDelta;
    }


    var lastThrustTime = 0;

    this.goForward = function(t){
        updateTime(t);
        var forwardVector = new THREE.Vector3(0, 10 * timeDelta, 0);
        var rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationFromEuler(spaceShip.rotation);
        forwardVector.applyMatrix4(rotationMatrix);
        shipMomentum.add(forwardVector);


        if(shipMomentum.x > 5) shipMomentum.x = 5;
        if(shipMomentum.x < -5) shipMomentum.x = -5;
        if(shipMomentum.y > 5) shipMomentum.y = 5;
        if(shipMomentum.y < -5) shipMomentum.y = -5;
    }

    this.shoot = function(t, held){
        updateTime(t);

        var shotdelay = held ? 350 : 100;

        if(lastTime - lastShot > shotdelay){
            lastShot = lastTime;
            var b = new Bullet(spaceShip.position, spaceShip.rotation, scale, scene, lastTime, viewportSize);
            return b;
        }

    }

    this.draw = function(t){
        updateTime(t);

        var tempMomentum = new THREE.Vector3();
        tempMomentum.copy(shipMomentum);
        tempMomentum.multiplyScalar(50 * timeDelta);

        spaceShip.position.add(tempMomentum);

        if(spaceShip.position.x < viewportSize / -2){
            spaceShip.position.x = viewportSize / 2;
        }
        if(spaceShip.position.x > viewportSize / 2){
            spaceShip.position.x = viewportSize / -2;
        }
        if(spaceShip.position.y < viewportSize / -2){
            spaceShip.position.y = viewportSize / 2;
        }
        if(spaceShip.position.y > viewportSize / 2){
            spaceShip.position.y = viewportSize / -2;
        }
    }

    this.getVertices = function(){
        var verts = [];
        for (var i = 0; i < spaceShip.geometry.vertices.length; i ++){
            var Vec = new THREE.Vector3();
            Vec.copy(spaceShip.geometry.vertices[i]);
            Vec.applyAxisAngle(new THREE.Vector3(0,0,1), spaceShip.rotation.z);
            Vec.add(spaceShip.position);
            verts.push(Vec);
        }
        return verts;
    }

}

function Bullet(shipLocation, shipRotation, scale, scene, time, viewportSize){


    var startTime = time;

    var lastTime = time;
    var timeDelta;
    function updateTime(t){
        if(lastTime == t) return;
        else{
            timeDelta = (t - lastTime) / 1000;
            lastTime = t;
        }
    }

    var whiteMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var bullet = new THREE.Mesh( new THREE.PlaneGeometry( 1 * scale, 1 * scale, 1, 1 ), whiteMaterial );

    var noseVector = new THREE.Vector3(0,3 * scale, 0);
    var m = new THREE.Matrix4();
    m.makeRotationFromEuler(shipRotation);
    noseVector.applyMatrix4(m);
    bullet.position.copy(shipLocation);
    bullet.position.add(noseVector);

    bullet.rotation.copy(shipRotation);
    scene.add(bullet);

    this.destroy = function(){
        scene.remove(bullet);
    }

    this.checkTime = function(t){
        updateTime(t);
        if(lastTime - startTime > 1000) return false;
        else return true;
    }

    this.move = function(){

        var movement = new THREE.Vector3(0,10,0);
        var m = new THREE.Matrix4();
        m.makeRotationFromEuler(bullet.rotation);
        movement.applyMatrix4(m);
        bullet.position.add(movement);

        if(bullet.position.x < viewportSize / -2){
            bullet.position.x = viewportSize / 2;
        }
        if(bullet.position.x > viewportSize / 2){
            bullet.position.x = viewportSize / -2;
        }
        if(bullet.position.y < viewportSize / -2){
            bullet.position.y = viewportSize / 2;
        }
        if(bullet.position.y > viewportSize / 2){
            bullet.position.y = viewportSize / -2;
        }
    }

    this.position = function(){
        return bullet.position;
    }
}


