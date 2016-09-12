'use strict';

import THREE from 'three';

var glslify = require('glslify')

class Box {

    constructor() {

        this.geom = new THREE.BoxGeometry(70, 70, 70);

        this.mat = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});

        this.mesh = new THREE.Mesh(this.geom, this.mat);

        this.mesh.position.set(150, 150, 150);
        
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    }

    update(el) {

        this.mesh.rotation.x += 0.05;
        this.mesh.rotation.y += 0.05;

    }

}

export default Box;
