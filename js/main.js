// miscs webgl

var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(45, width/height, .1, 500);
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(0xdddddd);
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

// grid helper

var axis = new THREE.AxisHelper(120);

var grid = new THREE.GridHelper(50,5);
var gridHelper = new THREE.Color("rgb(255, 0, 0)");
var gridColor = new THREE.Color("rgb(200, 186, 186)");

grid.setColors(gridHelper, gridColor);

scene.add(grid);
scene.add(axis);

// cube I (blue)

var cubeGeometry = new THREE.BoxGeometry(5, 5, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x4BB9DE});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.x = 0;
cube.position.y = 10;
cube.position.z = 0;
cube.castShadow = true;

scene.add(cube);

// electron

/*var electronGeometry = new THREE.BoxGeometry(1, 1, 4);
var electronMaterial = new THREE.MeshBasicMaterial({color: 0xE51E19});
var electron = new THREE.Mesh(electronGeometry, electronMaterial);

electron.position.x = 0;
electron.position.y = 0;
electron.position.z = 30;
electron.castShadow = true;

scene.add(electron);
*/

// add the electrons that are free in Valencia layer

electronsGroup = new THREE.Group();
scene.add(electronsGroup);

for (var i = 0; i < 30; i++) {
		var electronGeometry = new THREE.BoxGeometry(1, 1, 4);
		var electronMaterial = new THREE.MeshBasicMaterial({color: Math.random() * 0x808008 + 0x808080});
		electrons = new THREE.Mesh(electronGeometry, electronMaterial);
		electrons.position.x = randomInt(-20,20);
		electrons.position.y = randomInt(-20,20);
		electrons.position.z = 30;

		electronsGroup.add(electrons);
};

/*
 * spotlight fail
 *

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.castShadow = true;

spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;

spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 30;

scene.add(spotLight);*/

// oh lord, can u see this shit?

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);
 
scene.add(pointLight);

camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;

camera.lookAt(scene.position);

/*
 *	gui
 *
 *	to-do to add a new item on gui:
 *
 *	add a public var on guiControls
 *	update var value on render() function
 *  reset the value to default on reset() function
 */

var guiControls = new function(){
	this.tutorial = 'Olá marilene!';
	this.rotationX = 0;
	this.rotationY = 0;
	this.newSize = 5.5;
	//electrons
	this.velocity = 3;
	this.number = 50;
}

var resetButton = {
	reset: function(){
		reset()
	}
};


var datGUI = new dat.GUI();

var f1 = datGUI.addFolder('Solenóide');
f1.add(guiControls, 'tutorial');
f1.add(guiControls, 'rotationX', -180, 180).listen();
f1.add(guiControls, 'rotationY', -180, 180).listen();
f1.add(guiControls, 'newSize', 1, 10).listen();
f1.add(resetButton, 'reset').listen();

f1.open();

var f2 = datGUI.addFolder('Campo');
f2.add(guiControls, 'velocity', 0.1, 6).listen();
f2.add(guiControls, 'number', 1, 100).listen();

f2.open();

render();

function randomInt(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function reset(){
	guiControls.rotationX = 0;
	guiControls.rotationY = 0;
	guiControls.newSize = 5;
	guiControls.velocity = 3;
	guiControls.number = 50;
}

/*function animate() {

	requestAnimationFrame(animate);
	render();
	//stats.update();

}*/

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function render(){
	cube.rotation.x = guiControls.rotationX*Math.PI/180;
	cube.rotation.y = guiControls.rotationY*Math.PI/180;
	cube.scale.x = guiControls.newSize;
	cube.scale.y = guiControls.newSize;

	if(electronsGroup.position.z > -50){
		electronsGroup.position.z -= guiControls.velocity;
	}else{
		electronsGroup.position.z = 30;
	}


/*	if(electron.position.z > -1){
		electron.position.z -= guiControls.velocity;
	}else{
		electron.position.z = 30;
	}

*/

	/*for (var i = 0; i < guiControls.number; i++) {
		var electronGeometry = new THREE.BoxGeometry(1, 1, 4);
		var electronMaterial = new THREE.MeshBasicMaterial({color: Math.random() * 0x808008 + 0x808080});
		electrons = new THREE.Mesh(electronGeometry, electronMaterial);
		electrons.position.x = randomInt(-20,20);
		electrons.position.y = randomInt(-20,20);
		electrons.position.z = 30;

		electronsGroup.add(electrons);
	};*/

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}