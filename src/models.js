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
// animate();

var orbit = new THREE.Object3D();
orbit.add(camera);

// Add the orbit to the scene
scene.add(orbit);

// Define the rotation speed of the camera
var rotationSpeed = 0.00;

// Define the radius of the camera's orbit
var radius = 3;



// render();
function vis_switch( mesh, gate1, gate2){
    var scrollPos = window.scrollY;
    if (scrollPos < gate2 && scrollPos > gate1 && mesh.visible == false ){
        mesh.visible = true;
    }else if( (scrollPos < gate1||scrollPos > gate2) && mesh.visible == true ){
        mesh.visible = false;
    }
    
    rotationSpeed = scrollPos%1000 / 100000;
    rotationSpeed = Math.max(0.0005, rotationSpeed);
    rotationSpeed = Math.min(0.005, rotationSpeed); 
}

function op_change(mesh){
    var scrollPos = window.scrollY;
    mesh.emissiveIntensity  = scrollPos%1000 / 1000;
}

function init() {
    

    rotationSpeed = 0.005;

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
    camera.position.set( 3, 0.15, 3 );
    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 000000 );
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

    const color = 0xFFFFFF;
    const intensity = 0.1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

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
        mesh.visible = false;

        scene.add( mesh );
        console.log(scene);

    } );

    loader.load( './models/ply/ascii/test.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01 } );
        
        const mesh = new THREE.Points( geometry, material );
        // console.log( mesh );
        
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.multiplyScalar( 0.1 );
        // mesh.visible = false;
        window.addEventListener('scroll', (event) => {
            vis_switch( mesh, 0, 1000);

        });
        document.getElementById('button_1').addEventListener('click', () => {
            mesh.visible = !mesh.visible;
        });
        
        scene.add( mesh );
    } );

   
    loader.load( './models/ply/ascii/txt_model_2.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial( { color: 0xffffff , emissive:0xffffff,  emissiveIntensity:0.1, opacity: 0.5} );
        
        window.addEventListener('scroll', (event) => {
            op_change(material);
        });
        const mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.multiplyScalar( 0.1 );
        scene.add( mesh );

    } );



    loader.load( './models/ply/ascii/barrier.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial( { color: 0xff0000 ,  opacity: 0.5, emissive: 0xff0000,  emissiveIntensity: 0.1} );
        const mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.5;
        mesh.scale.multiplyScalar( 0.05 );

        window.addEventListener('scroll', (event) => {
            vis_switch( mesh, 0, 1000);
            vis_switch( mesh, 2000, 3000);
        });

        scene.add( mesh );

    } );


    loader.load( './models/ply/ascii/txt_model_pt.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01 } );
        
        const mesh = new THREE.Points( geometry, material );
        // console.log( mesh );
        
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.multiplyScalar( 0.1 );
        mesh.visible = false;
        window.addEventListener('scroll', (event) => {
            vis_switch( mesh, 1000, 2000);
        });
        document.getElementById('button_2').addEventListener('click', () => {
            mesh.visible = !mesh.visible;
        });
        console.log(window.scrollY);
        /*window.onscroll = function(){
            scrollPosition = window.scrollY;
            if (scrollPosition > 500 && txt_visible == false){
                mesh.visible = !mesh.visible;
                txt_visible = true; 
            }else{
                txt_visible = false;
            }
        }*/
        scene.add( mesh );
    } );

    loader.load( './models/ply/ascii/pt_cloud.ply', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01 } );
        
        const mesh = new THREE.Points( geometry, material );
        // console.log( mesh );
        mesh.position.y = 0.5;
        mesh.position.z = 0;
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.multiplyScalar( 0.05 );
        mesh.visible = false;
        window.addEventListener('scroll', (event) => {
            vis_switch( mesh, 2000, 3000);
        });
        document.getElementById('button_3').addEventListener('click', () => {
            mesh.visible = !mesh.visible;
        });
        
        scene.add( mesh );
    } );

    window.addEventListener('mousedown', (event) => {
        rotationSpeed = 0.00005;
    });

    window.addEventListener('mouseup', (event) => {
        rotationSpeed = window.scrollY%1000 / 100000;
        rotationSpeed = Math.max(0.0005, rotationSpeed);
        rotationSpeed = Math.min(0.005, rotationSpeed);
    });
    

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

// document.getElementById('button_1').addEventListener('click', () => {
//     camera.position.set( -2.1, -0.4, -3.6);
//     render(performance.now());
// });

// canvas.addEventListener("mousedown", (event) => {
//     console.log(`Canvas three: Mouse down at (${event.clientX}, ${event.clientY})`);
//     console.log(camera.position);
//     render(performance.now());
//     // Handle the mousedown event for canvas 2.
//   });






render(performance.now());








