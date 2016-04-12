'use strict';

import dat  from 'dat-gui';
import raf from 'raf';
import Stats  from 'stats-js';

import THREE from 'three';

import WebGL from './webgl';

class Manager {

    constructor(args) {
        this.webgl = null;
        this.gui = null;
        this.clock = new THREE.Clock();
        this.DEBUG = true;
        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };

        this.bind();

        this.startWebGL();

        this.startStats();
        this.startGUI();

        this.addEventListener();

        this.update();
    }

    bind() {

        this.update = this.update.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onResize = this.onResize.bind(this);

    }

    addEventListener() {

        window.addEventListener('resize', this.onResize);
        window.addEventListener('keyup', this.onKeyUp);

    }

    /*
    Starts
    */

    startStats() {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = 0;
        this.stats.domElement.style.display = this.DEBUG ? 'block' : 'none';
        this.stats.domElement.style.left = 0;
        this.stats.domElement.style.zIndex = 50;
        document.body.appendChild(this.stats.domElement);
    }

    startGUI() {
        this.gui = new dat.GUI()
        this.gui.domElement.style.display = this.DEBUG ? 'block' : 'none';

        let cameraFolder = this.gui.addFolder('Camera');
        cameraFolder.add(this.WebGL.camera.position, 'x', -10, 10);
        cameraFolder.add(this.WebGL.camera.position, 'y', -10, 10);
        cameraFolder.add(this.WebGL.camera.position, 'z', 50, 150);

        let composerFolder = this.gui.addFolder('PostProcessing');
        composerFolder.add(this.WebGL, 'useComposer');

    }

    startWebGL() {

        this.WebGL = new WebGL(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.WebGL.renderer.domElement);

    }

    update() {

        this.stats.begin();

        let el = this.clock.getElapsedTime() * .05;
        let d = this.clock.getDelta();

        this.WebGL.update(d);

        this.stats.end()

        raf(this.update);

    }

    /*
    Events
    */

    onKeyUp(e) {

        let key = e.which || e.keyCode;
        console.log(key);

    }

    onResize() {

        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };

        this.WebGL.onResize();

    }

}

export default Manager;
