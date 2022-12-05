import * as THREE from 'three';

import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('three-container');
// Set the position and size of the canvas element.
canvas.style.position = 'fixed';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';



// Set the overflow property of the canvas element to "hidden" to prevent it from showing scrollbars.
canvas.style.overflow = 'hidden';

// Set the overflow property of the body element to "scroll" to allow other elements on the page to be scrolled.
document.body.style.overflow = 'scroll';

// let container, stats;

let camera, cameraTarget, scene;
const width = window.innerWidth;
const height = window.innerHeight;



// var container = document.getElementById('three-container');
var renderer = new THREE.WebGLRenderer( { canvas });
renderer.setSize(width, height);
// container.appendChild(renderer.domElement);
let lastFrameTime = 0;
const frameInterval = 1000 / 60; 

init();

var orbit = new THREE.Object3D();
orbit.add(camera);

// Add the orbit to the scene
scene.add(orbit);

// Define the rotation speed of the camera
var rotationSpeed = 0.005;

// Define the radius of the camera's orbit
var radius = 3;

// render();

function init() {

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
    camera.position.set( 3, 0.15, 3 );
    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 000000 );
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


    // PLY file
    const loader = new PLYLoader();
    loader.load( './models/ply/ascii/dolphins.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01 } );
        const mesh = new THREE.Points( geometry, material );

        mesh.position.y = - 0.2;
        mesh.position.z = 0.3;
        mesh.rotation.x = - Math.PI / 2;
        mesh.scale.multiplyScalar( 0.001 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

    } );

    loader.load( './models/ply/binary/Lucy100k.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01 } );
        const mesh = new THREE.Points( geometry, material );

        mesh.position.x = - 0.2;
        mesh.position.y = - 0.02;
        mesh.position.z = - 0.2;
        mesh.scale.multiplyScalar( 0.0006 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

    } );

    loader.load( './models/ply/ascii/test.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01 } );
        
        const mesh = new THREE.Points( geometry, material );
        // console.log( mesh );
        
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.multiplyScalar( 0.1 );
        document.getElementById('button').addEventListener('click', () => {
            mesh.visible = !mesh.visible;
        });
        
        scene.add( mesh );
    } );

    // model = loader.parse( './models/ply/ascii/test.ply', 'ply');
    // console.log(model);

    // renderer
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(0, 0, 0);
    controls.update();
    controls.enableZoom = false;
    
    // resize
    scene.add(camera);
    window.addEventListener( 'resize', onWindowResize );
    // window.addEventListener('mousewheel', onMouseWheel, true);


    var myElement = document.getElementById("container");
    var children = myElement.children;

    // Define the minimum and maximum transparency values
    var minOpacity = 0;
    var maxOpacity = 1;
    // console.log("container", myElement);
    /*window.onscroll = function() {
        var scrollPosition = window.scrollY;
        var newOpacity = (scrollPosition / 10);
        console.log("scrollPosition", scrollPosition);
        // console.log("new opacity", newOpacity);
        // Update the element's transparency
        myElement.style.opacity = newOpacity;
    }*/

    window.onscroll = function() {
        // Get the number of pixels the user has scrolled
        var scrollPosition = window.scrollY;
       

        // Loop through the child elements
        for (var i = 0; i < children.length; i++) {
            // Calculate the distance of the element from the middle of the viewport
            var elementTop = children[i].offsetTop;
            var distance = Math.abs(scrollPosition + (window.innerHeight / 2) - elementTop);
            console.log(i, elementTop, window.innerHeight / 2, distance);
            // Calculate the new transparency for the element (from minOpacity to maxOpacity)
            var newOpacity = maxOpacity - (distance / 500);
            
            newOpacity = Math.max(newOpacity, minOpacity);

            // Update the element's transparency
            children[i].style.opacity = newOpacity;
        }
    }
}   



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function render(time) {
    orbit.rotation.y += rotationSpeed;

    // Update the position of the camera based on its orbit
    camera.position.x = radius * Math.sin(orbit.rotation.y);
    camera.position.z = radius * Math.cos(orbit.rotation.y);

    // Make the camera look at the target
    camera.lookAt(cameraTarget);
    const elapsedTime = time - lastFrameTime;
    
    if (elapsedTime >= frameInterval) {
        // Render scene with updated camera position
        renderer.render(scene, camera);

        // Update last frame time
        lastFrameTime = time;
    }

    // Request next animation frame
    requestAnimationFrame(render);
}

document.getElementById('button').addEventListener('click', () => {
    camera.position.set( -2.1, -0.4, -3.6);
    render(performance.now());
});

canvas.addEventListener("mousedown", (event) => {
    console.log(`Canvas three: Mouse down at (${event.clientX}, ${event.clientY})`);
    console.log(camera.position);
    render(performance.now());
    // Handle the mousedown event for canvas 2.
  });






render(performance.now());








