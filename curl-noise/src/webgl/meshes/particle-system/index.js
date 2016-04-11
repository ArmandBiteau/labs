'use strict';

import THREE from 'three';

var glslify = require('glslify')

class ParticleSystem {

    constructor() {

        let particlesCount = Math.pow(200, 2);

        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                color: {type: 'c', value: new THREE.Color(0x535353)},
                time: {type : 'f', value: 0},
            },
            transparent: true,
            vertexShader: glslify('../../glsl/particle-vs.glsl'),
            fragmentShader: glslify('../../glsl/particle-fs.glsl'),
        });

        this.geom = new THREE.BufferGeometry();

        let pos = new Float32Array(particlesCount * 3);

        for (let i = 0, a = 0; i < pos.length; i+=3, a++) {

            // x
            pos[i + 0] = (Math.random() * 500) / 1000;

            // y
            pos[i + 1] = (Math.random() * 30000) / 10000;

            // z
            pos[i + 2] = 0;

        };

        this.geom.addAttribute('position', new THREE.BufferAttribute(pos, 3));

        this.mesh = new THREE.Points(this.geom, this.mat);

    }

    update(el) {

        this.mesh.material.uniforms.time.value = el;
        //this.mesh.rotation.x += 0.002;
        //this.mesh.rotation.y -= 0.008;

    }

}

export default ParticleSystem;
