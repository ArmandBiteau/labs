'use strict';

import THREE from 'three';

import Plane from './meshes/plane';

import Ground from './meshes/ground';

import Line from './meshes/line';

let OrbitControls = require('three-orbit-controls')(THREE)

let WAGNER = require('@superguigui/wagner');
let FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPass');
let TiltPass = require('@superguigui/wagner/src/passes/tiltshift/tiltshiftPass');
let VignettePass = require('@superguigui/wagner/src/passes/vignette/vignettePass');


class WebGL {

    constructor(w, h) {

        this.useComposer = false;
        this.renderer = null;
        this.camera = null;
        this.scene = null;

        this.createScene();
        this.createRenderer(w, h);

        this.createControls();

        this.addLights();

        this.addObjects();

        this.addComposer(w, h);

        this.onResize();
        this.update();

    }

    createScene() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.set(1100, 1100, 1400);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    }

    createRenderer(w, h) {

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(w, h);
        this.renderer.setClearColor(0x2D2463);

    }

    createControls() {

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    }

    addLights() {

        this.spotlight = new THREE.DirectionalLight(0xFFFFFF);
        this.spotlight.castShadow = true;
        this.spotlight.shadowDarkness = 0.05;
        this.spotlight.position.set(0, 1500, 700);
        this.scene.add(this.spotlight);

    }

    addObjects() {

        this.plane = new Plane();
        this.scene.add(this.plane.mesh);

        this.line = new Line();
        this.scene.add(this.line.mesh);

        this.ground = new Ground();
        this.scene.add(this.ground.mesh);

    }

    addComposer(w, h) {

        this.useComposer = true;
        this.composer = new WAGNER.Composer(this.renderer);
        this.composer.setSize(w, h);

        this.createComposePass();

    }

    createComposePass() {

        this.FXAAPass = new FXAAPass();

        this.TiltPass = new TiltPass();
        this.TiltPass.params.bluramount = 3.0;
    	this.TiltPass.params.center = 0.9;

        this.VignettePass = new VignettePass({boost: 1.4, reduction: 1.2});

    }

    update(el) {

        this.plane.update(el);

        this.line.update(el);

        this.ground.update(el);

        this.composer.reset();
        this.composer.renderer.clear();
        this.composer.render(this.scene, this.camera);

        if (this.useComposer) {

            this.composer.pass(this.FXAAPass);
            // this.composer.pass(this.TiltPass);
            this.composer.pass(this.VignettePass);

        }

        this.composer.toScreen();

    }

    onResize() {

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.composer.setSize(window.innerWidth, window.innerHeight);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

    }
}

export default WebGL;
