'use strict';

import Sphere from './meshes/sphere';
import THREE from 'three';

let OrbitControls = require('three-orbit-controls')(THREE)

let WAGNER = require('@superguigui/wagner');
let NoisePass = require('@superguigui/wagner/src/passes/noise/noise');
let FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPass');


class WebGL {

    constructor(w, h) {

        this.useComposer = false;
        this.renderer = null;
        this.camera = null;
        this.scene = null;

        this.createScene();
        this.createRenderer(w, h);

        this.createControls();

        this.addObjects();

        this.addComposer(w, h);

        this.onResize();
        this.update();

    }

    createScene() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.z = 100;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    }

    createRenderer(w, h) {

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(w, h);
        this.renderer.setClearColor(0x111111);

    }

    createControls() {

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    }

    addObjects() {

        this.sphere = new Sphere();
        this.scene.add(this.sphere.mesh);

    }

    addComposer(w, h) {

        this.useComposer = true;
        this.composer = new WAGNER.Composer(this.renderer);
        this.composer.setSize(w, h);

        this.createComposePass();

    }

    createComposePass() {

        this.NoisePass = new NoisePass();
        this.FXAAPass = new FXAAPass();

    }


    update(d) {

        this.sphere.update(d);

        this.composer.reset();
        this.composer.renderer.clear();
        this.composer.render(this.scene, this.camera);

        if (this.useComposer) {

            this.composer.pass(this.FXAAPass);
            this.composer.pass(this.NoisePass);

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
