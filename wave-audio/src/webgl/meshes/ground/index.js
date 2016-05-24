'use strict';

import THREE from 'three';

var glslify = require('glslify')

class Ground {

    constructor() {


        this.geom = new THREE.PlaneGeometry(3000, 3000, 10, 10);

        this.mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x2D2463),
            side: 2
        });

        this.mesh = new THREE.Mesh(this.geom, this.mat);
        // this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.rotation.x = - Math.PI / 2;
        this.mesh.rotation.z = - Math.PI / 2;

        this.mesh.position.y = -100;


    }

    update(el) {


    }


}

export default Ground;
