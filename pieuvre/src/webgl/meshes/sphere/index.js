'use strict';

import THREE from 'three';

import GLAudio from '../../../core/audio';

var glslify = require('glslify')

class Sphere {

    constructor() {

        var sphereGeometry = new THREE.SphereGeometry(100, 31, 31);
        this.geom = new THREE.BufferGeometry().fromGeometry(sphereGeometry)

        this.waveAudio = new Float32Array(5580);

        this.geom.addAttribute('offset', new THREE.BufferAttribute(this.waveAudio, 1));

        this.mat = new THREE.ShaderMaterial({
            vertexShader: glslify('../../glsl/sphere-vs.glsl'),
            fragmentShader: glslify('../../glsl/sphere-fs.glsl'),
            uniforms: {
                time: {type: 'f', value: 0}
            },
            transparent: true,
            side: 2,
            wireframe:true
        });

        this.mesh = new THREE.Mesh(this.geom, this.mat);
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.x = -1 + Math.PI/2;
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    }

    update(el) {

        this.mesh.material.uniforms.time.value = el;

        // var wave = GLAudio.dancer.getWaveform();
        // this.waveAudio = [];
        // this.waveAudio.push(...wave);
        // this.waveAudio.push(...wave);
        // this.waveAudio.push(...wave);
        // this.waveAudio.push(...wave);
        // this.waveAudio.push(...wave);
        //
        // this.mesh.geometry.attributes.offset.value = this.waveAudio;
        //
        // this.mesh.geometry.attributes.offset.needsUpdate = true;

    }

}

export default Sphere;
