'use strict';

import THREE from 'three';

import GLAudio from '../../../core/audio';

var glslify = require('glslify')

class Plane {

    constructor() {

        this.size = 64;

        this.uLightColor = new THREE.Color(0x3AFFFF);
        this.uDarkColor = new THREE.Color(0x2D2463);

        this.lightColor = this.uLightColor;
        this.darkColor = this.uDarkColor;

        this.halfRender = true;

        this.geom = new THREE.PlaneGeometry(1024, 1260, this.size, this.size-1);

        this.mat = new THREE.ShaderMaterial({
            vertexShader: this.shaderParse(glslify('../../glsl/plane-vs.glsl')),
            fragmentShader: this.shaderParse(glslify('../../glsl/plane-fs.glsl')),
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib.shadowmap,
                {
                    lightPosition: {type: 'v3', value: new THREE.Vector3(0, 1500, 700)},
                    time: {type: 'f', value: 0},
                    lightColor: {
                        type: 'c',
                        value: this.lightColor
                    },
                    middleColor: {
                        type: 'c',
                        value: new THREE.Color(0x571b73)
                    },
                    darkColor: {
                        type: 'c',
                        value: this.darkColor
                    },
                    fogColor: {
                        type: 'c',
                        value: new THREE.Color(0x2D2463)
                    }
                }
            ]),
            transparent: true,
            side: 2,
            wireframe:false,
            alphaTest: 0.5
        });

        this.mesh = new THREE.Mesh(this.geom, this.mat);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.rotation.x = Math.PI / 2;
        this.mesh.rotation.z = - Math.PI / 2;
        this.mesh.position.x = -50;

        this.mesh.position.y = 250;

        // this.mesh.material.alphaTest = 0.5;
        //
        // this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
        //     vertexShader: this.shaderParse(glslify('../../glsl/depth-vs.glsl')),
        //     fragmentShader: this.shaderParse(glslify('../../glsl/depth-fs.glsl')),
        //     uniforms: this.mesh.material.uniforms
        // });

        this.createKick();

    }

    update(el) {

        this.mesh.material.uniforms.lightColor.value = this.lightColor;
        this.mesh.material.uniforms.darkColor.value = this.darkColor;

        this.mesh.material.uniforms.time.value = el;

        if (this.halfRender) {

            var wave = this.createWaveBuffer();

            for (var i = 0; i <= this.size; ++i) {
                this.mesh.geometry.vertices[i].z = wave[i]*180;
            }

            for (var i=this.size*this.size; i > this.size; --i) {
                this.mesh.geometry.vertices[i].z = this.mesh.geometry.vertices[i-(this.size+1)].z;
            }


            this.mesh.geometry.verticesNeedUpdate = true;

        }

        // this.halfRender = !this.halfRender;

    }

    replaceThreeChunkFn(a, b) {
        return THREE.ShaderChunk[b] + '\n';
    }

    shaderParse(glsl) {
        return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, this.replaceThreeChunkFn);
    }

    createWaveBuffer() {

        var wave = GLAudio.dancer.getWaveform();
        var tmp = [];
        for (var i = 0; i < wave.length; i = i+(1024/this.size)) {
            tmp.push(wave[i]);
        }
        return tmp;

    }

    createKick() {

        this.lowKick = GLAudio.dancer.createKick({
            frequency: [ 1, 1.5 ],
            // threshold: 0.4,
            onKick: () => {
                this.darkColor = this.uLightColor;
                this.lightColor = this.uDarkColor;

            },
            offKick: () => {
                this.lightColor = this.uLightColor;
                this.darkColor = this.uDarkColor;
            }
        });
        this.lowKick.on();

    }

}

export default Plane;
