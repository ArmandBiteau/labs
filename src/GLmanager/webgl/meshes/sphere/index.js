'use strict';

import THREE from 'three';

let glslify = require('glslify')

class Sphere {

    constructor() {

        this.geom = new THREE.SphereGeometry(30, 60, 60);

        this.mat = new THREE.RawShaderMaterial({
            uniforms: {
        		time: { type: 'f', value: 1.0 },
        		resolution: { type: 'v2', value: new THREE.Vector2() }
        	},
        	vertexShader: glslify('../../glsl/test-vs.glsl'),
        	fragmentShader: glslify('../../glsl/test-fs.glsl'),
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh(this.geom, this.mat);

    }

    update(d) {

        this.mesh.rotation.y += 0.005;

    }

}

export default Sphere;
