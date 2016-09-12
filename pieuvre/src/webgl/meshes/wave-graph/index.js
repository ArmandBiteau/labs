'use strict';

import THREE from 'three';

var glslify = require('glslify')

class WaveGraph {

    constructor() {

        var min = -150, max = 150, range = max - min;

        var meshFunction = function(x, y) {

    		x = range * x + min;
    		y = range * y + min;
            var z = 0.0;

			return new THREE.Vector3(x, y, z);

        };

        this.geom = new THREE.ParametricGeometry(meshFunction, 50, 50, true);

        //this.geom = new THREE.PlaneGeometry(5, 20, 32);

        var vs = glslify('../../glsl/wave-vs.glsl');
        var fs = glslify('../../glsl/wave-fs.glsl');

        this.mat = new THREE.ShaderMaterial({

            vertexShader: this.shaderParse(vs),
            fragmentShader: this.shaderParse(fs),

            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib.shadowmap,
                {
                    lightPosition: {type: 'v3', value: new THREE.Vector3(0, 700, 300)},
                    time: {type: 'f', value: 0}
                }
            ]),
            transparent: true,
            side: 2,
            wireframe:true
        });

        this.mesh = new THREE.Points(this.geom, this.mat);
        // this.mesh.castShadow = true;
        // this.mesh.receiveShadow = true;

        // this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
        //     vertexShader: this.shaderParse(glslify('../../glsl/depth-vs.glsl')),
        //     fragmentShader: this.shaderParse(glslify('../../glsl/depth-fs.glsl')),
        //     uniforms: this.mat.uniforms
        // });

        this.mesh.rotation.x = -1;
        // this.mesh.rotation.z = Math.PI/4;

        this.mesh.position.y = 0;


    }

    replaceThreeChunkFn(a, b) {
        return THREE.ShaderChunk[b] + '\n';
    }

    shaderParse(glsl) {
        return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, this.replaceThreeChunkFn);
    }

    update(el) {

        this.mesh.material.uniforms.time.value = el;
        //this.mesh.rotation.x += 0.002;
        //this.mesh.rotation.y -= 0.008;

    }

}

export default WaveGraph;
