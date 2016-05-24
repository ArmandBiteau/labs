'use strict';

import dat  from 'dat-gui';
import raf from 'raf';
import Stats  from 'stats-js';

import THREE from 'three';

import WebGL from '../webgl';

import GLSound from '../core/audio';

class Manager {

    constructor(args) {
        this.webgl = null;
        this.gui = null;
        this.clock = new THREE.Clock();
        this.DEBUG = true;

        this.bind();

        GLSound.init('NosajThing-CoatOfArms.mp3').then(() => {

            this.startWebGL();

            this.startStats();
            this.startGUI();

            this.addEventListener();

            this.update();

            GLSound.play();

        });

    }

    bind() {

        this.update = this.update.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onResize = this.onResize.bind(this);

    }

    addEventListener() {

        window.addEventListener('resize', this.onResize);
        // window.addEventListener('keyup', this.onKeyUp);

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

        this.WebGL.update(el);

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

        this.WebGL.onResize();

    }

}

export default Manager;
