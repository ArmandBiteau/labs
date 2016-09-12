'use strict';

import THREE from 'three';

import GLAudio from '../../../core/audio';

var glslify = require('glslify')

class Line {

    constructor() {

        this.size = 512;

        this.geom = new THREE.Geometry();

        for (var i = 0; i < this.size; i++) {
            this.geom.vertices.push(new THREE.Vector3(-this.size + 2*i, 0, 0));
        };

        this.mat = new THREE.LineBasicMaterial({
            color: 0x3AFFFF,
            linewidth: 2
        });

        this.mesh = new THREE.Line(this.geom, this.mat);

        this.mesh.position.x = 50;
        this.mesh.position.y = 270;
        this.mesh.position.z = 700;

        this.createKick();

    }

    update(el) {

        var wave = this.createSpectrumBuffer();

        for (var i = 0; i < this.size; ++i) {
            this.mesh.geometry.vertices[i].y = wave[i]*100;
        }

        this.mesh.geometry.verticesNeedUpdate = true;

    }

    replaceThreeChunkFn(a, b) {
        return THREE.ShaderChunk[b] + '\n';
    }

    shaderParse(glsl) {
        return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, this.replaceThreeChunkFn);
    }

    createSpectrumBuffer() {

        var wave = GLAudio.dancer.getWaveform();
        var tmp = [];
        for (var i = 0; i < wave.length; i = i+(1024/this.size)) {
            tmp.push(wave[i]);
        }
        return tmp;

    }

    createKick() {

        this.lowKick = GLAudio.dancer.createKick({
            frequency: [ 0, 10 ],
            onKick: () => {
                this.darkColor = new THREE.Color(0x4E3675);
            },
            offKick: () => {
                this.darkColor = new THREE.Color(0x571b73);
            }
        });
        this.lowKick.on();

    }

}

export default Line;
