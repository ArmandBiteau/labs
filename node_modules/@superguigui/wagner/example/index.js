'use strict';

var domready = require('domready');
var THREE = require('three');
var raf = require('raf');
var dat = require('dat-gui');
var WAGNER = require('..');

// Passes
var BoxBlurPass = require('../src/passes/box-blur/BoxBlurPass');
var FXAAPass = require('../src/passes/fxaa/FXAAPass');
var ZoomBlurPass = require('../src/passes/zoom-blur/ZoomBlurPass');
var MultiPassBloomPass = require('../src/passes/bloom/MultiPassBloomPass');

var scene, camera, renderer;
var material, light;
var cubes = [];
var composer, boxBlurPass, fxaaPass, bloomPass;
var gui;

var params = {
  usePostProcessing: true,
  useFXAA: true,
  useBlur: false,
  useBloom: true
};

domready(function() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x323232);
  document.body.appendChild(renderer.domElement);

  light = new THREE.PointLight(0xFFFFFF, 1);
  light.position.copy(camera.position);
  scene.add(light);

  material = new THREE.MeshPhongMaterial({color: 0x3a9ceb});

  for(var i = 0, c; i < 500; i++) {
    c = addCube();
    cubes.push(c);
    scene.add(c);
  }
  c.position.set(0, 0, 50);

  initPostprocessing();
  initGui();

  window.addEventListener('resize', resize);
  
  raf(animate);
});

function resize() {
  composer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addCube() {
  var cube = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), material);
  cube.position.set(
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * -500
  );
  cube.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
  return cube;
}

function initPostprocessing() {
  renderer.autoClearColor = true;
  composer = new WAGNER.Composer(renderer);
  fxaaPass = new FXAAPass();
  boxBlurPass = new BoxBlurPass(3, 3);
  bloomPass = new MultiPassBloomPass({
    blurAmount: 2,
    applyZoomBlur: true
  });
  return composer;
}

function initGui() {
  gui = new dat.GUI();
  gui.add(params, 'usePostProcessing');
  gui.add(params, 'useFXAA');
  gui.add(params, 'useBlur');
  gui.add(params, 'useBloom');
  return gui;
}

function animate() {
  raf(animate);

  for(var i = 0; i < cubes.length; i++) {
    cubes[i].rotation.y += 0.01 + ((i - cubes.length) * 0.00001);
    cubes[i].rotation.x += 0.01 + ((i - cubes.length) * 0.00001);
  }

  if(params.usePostProcessing) {
    composer.reset();
    composer.render(scene, camera);
    if(params.useFXAA) composer.pass(fxaaPass);
    if(params.useBlur) composer.pass(boxBlurPass);
    if(params.useBloom) composer.pass(bloomPass);
    composer.toScreen();
  }
  else {
    renderer.render(scene, camera);
  }

}
