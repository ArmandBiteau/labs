#pragma glslify: curl = require(glsl-curl-noise)

//varying vec2 vUv;
varying vec3 vPosition;

uniform float time;

void main() {

    float multiplier = 20.0;

    vPosition = position;

    //vPosition.z = sin( time*3.0 * sqrt( ( pow(vPosition.x, 2.0) + pow(vPosition.y, 2.0) ) ) ) * multiplier;
    vPosition.z = sin( time*10.0 ) * multiplier;

    //vUv = uv;

    gl_PointSize = 1.5;

    vec4 mvPosition = modelViewMatrix * vec4( vPosition, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

}
