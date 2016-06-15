
var container, stats;
var camera, scene, raycaster, renderer, parentTransform, sphereInter;
var controls, gui;
var mouse = new THREE.Vector2();
var radius = 100, theta = 0;
var currentIntersected;
var perlin;

init();
animate();

function init() {



  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 10;

  controls = new THREE.TrackballControls( camera );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];
  controls.addEventListener( 'change', render );

  scene = new THREE.Scene();

  // var geometry = new THREE.SphereGeometry( 5 );
  // var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  // sphereInter = new THREE.Mesh( geometry, material );

  var helper = new THREE.GridHelper( 200, 10, 0x0000ff, 0x808080 );
  helper.position.y = -100;
  helper.position.x = 0;
  scene.add( helper );




  var geometry = new THREE.Geometry();
  var point = new THREE.Vector3();



  for ( var i = 0; i < 128; i ++ ) {
    var direction = new THREE.Vector3();
    direction.x = i*1;
		direction.y = 0.0;
		direction.z = 0.0;
		//direction.normalize().multiplyScalar( 1 );

    //point.add( direction );
		geometry.vertices.push( direction);

  }
  geometry.dynamic = true;


  perlin = Perlin();



  parentTransform = new THREE.Object3D();
  var lineObject = new THREE.Line( geometry );
  lineObject.position.x = -128/2;
  parentTransform.add( lineObject );
  console.log(parentTransform.children[0].geometry.vertices);

  parentTransform.position.x = 0;
  parentTransform.position.y = 0;
  parentTransform.position.z = 0;
  console.log(geometry.vertices[i])
  // for ( var i = 0; i < 10; i ++ ) {
  // 	var object;
  // 	// 2分の1で点線か線
  // 	if ( Math.random() > 0.5 ) {
  // 		object = new THREE.Line( geometry );
  // 	} else {
  // 		object = new THREE.LineSegments( geometry );
  // 	}
  //
  //object.position.x = Math.random() * 400 - 200;
  // 	object.position.y = Math.random() * 400 - 200;
  // 	object.position.z = Math.random() * 400 - 200;
  // 	object.rotation.x = Math.random() * 2 * Math.PI;
  // 	object.rotation.y = Math.random() * 2 * Math.PI;
  // 	object.rotation.z = Math.random() * 2 * Math.PI;
  // 	object.scale.x = Math.random() + 0.5;
  // 	object.scale.y = Math.random() + 0.5;
  // 	object.scale.z = Math.random() + 0.5;
  // 	parentTransform.add( object );
  // }
  scene.add( parentTransform );
  // raycaster = new THREE.Raycaster();
  // raycaster.linePrecision = 3;
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild(renderer.domElement);
  stats = new Stats();
  container.appendChild( stats.dom );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

  controls.handleResize();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}
function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
//
function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
  controls.update();
  //parentTransform.children[0].geometry.update();




}
function render() {
  theta += 0.1;
  analyser.getByteFrequencyData(bytes);
  //console.log(bytes.length);
  for ( var i = 0; i < 128; i ++ ) {

    //parentTransform.children[0].vertices.y += 0.1
    if(isAnalise){
      //console.log(bytes[i]);
      parentTransform.children[0].geometry.vertices[i].y = bytes[i];
    }

  }

  parentTransform.children[0].geometry.verticesNeedUpdate = true;

  // camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  // camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  // camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  // camera.lookAt( scene.position );
  // camera.updateMatrixWorld();
  // find intersections
  // raycaster.setFromCamera( mouse, camera );
  // var intersects = raycaster.intersectObjects( parentTransform.children, true);
  // if ( intersects.length > 0 ) {
  // 	if ( currentIntersected !== undefined ) {
  // 		currentIntersected.material.linewidth = 1;
  // 	}
  // 	currentIntersected = intersects[ 0 ].object;
  // 	currentIntersected.material.linewidth = 5;
  // 	sphereInter.visible = true;
  // 	sphereInter.position.copy( intersects[ 0 ].point );
  // } else {
  // 	if ( currentIntersected !== undefined ) {
  // 		currentIntersected.material.linewidth = 1;
  // 	}
  // 	currentIntersected = undefined;
  // 	sphereInter.visible = false;
  // }
  renderer.render( scene, camera );
}
