// Set up renderer
const renderer = new THREE.WebGLRenderer( { antialias: true , alpha: true} );
renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000, 0)


var container = document.getElementById('three');
var w = 1000;
var h = 500;
renderer.setSize(w, h);
container.appendChild(renderer.domElement);


// Set up scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x999999)
// scene.fog = new THREE.Fog(0x333333, 1, 5000 );


// Set up camera
const camera = new THREE.PerspectiveCamera(-100, window.innerWidth / window.innerHeight, 0.1, 5000)
camera.position.z = -50
camera.lookAt(scene.position)

// var controls = new THREE.OrbitControls( camera );
// controls.update();


// Set up lighting
const light = new THREE.AmbientLight(0xfff, 100)
scene.add(light)


const point1 = new THREE.PointLight(0x000000, 1, 20, 1)
point1.position.set( 45, -49, 50 );
scene.add(point1)

const point2 = new THREE.PointLight(0x000000, 1, 20, 1 )
point2.position.set( -50, 100, -50 );
scene.add(point2)



var shapes = []
var frame = 0;
var color = 0x003366;

// Create planet
const createShape = function(x, y) {
  const geometry = new THREE.SphereGeometry(20, 42, 42)
  const material = new THREE.MeshPhongMaterial({
    color: 0x000,
    emissive:color,
    shininess: 30
  })
  const shape = new THREE.Mesh(geometry, material)

  shape.name = "shape"

  
  
  material.wireframe = true;
  shape.rotateZ(0.5)
  shapes.push(shape)
  scene.add(shape)
}
 ///like its not see this X and Y value that I want to get out of the animate() 


//Moons
const makeMoon = function(size, color, tense) {
  var geometry = new THREE.SphereBufferGeometry(size, 64,64);
  var moon = new THREE.PointLight(color,10, tense);
  moon.add( new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: color , wireframe:true} ) ) );
  scene.add( moon );
  return(moon)
}

const moon1 = makeMoon(0.01,0x000, 30);
const moon2 = makeMoon(0.01,0x000, 30);
const moonFixed=makeMoon(19.9,color, 100);

const moonGroup = new THREE.Group()
moonGroup.add(moon1, moon2)
scene.add(moonGroup)

moon1.translateX(Math.sin(-30)*30)
moon2.translateX(Math.sin(30)*30)


moonFixed.position.set(0,0,0)



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Add animation loop
const animate = function() {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
  // controls.update();
  
  var shape = scene.getObjectByName( "shape" );
  // scene.remove(shape)

  
  //generate random
  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
  
  //use random for planes in sphere 
  var x = getRandomInt(31,32)
  var y = getRandomInt(31,32) /////////// This is what I want to use for the createShape x and y 
 
  console.log(x)
  console.log(y)
  
  
   
  
   var time = Date.now() * 0.0005
   point1.position.x = Math.sin(time * 0.7) * 15
   point1.position.y = Math.cos(time * 0.5) * 30
   point1.position.z = Math.cos(time * 0.3) * 2
  
   point2.position.x = Math.cos(time * 0.7) * 15
   point2.position.y = Math.sin(time * 0.5) * 9
   point2.position.z = Math.sin(time * 0.3) * 2
  
   moonGroup.rotateY(0.01)
  
  
   shapes.forEach(shape => {
    shape.rotateX(0.01)

  })
}

createShape()

// Start animation
animate()


window.addEventListener("resize", function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  
})