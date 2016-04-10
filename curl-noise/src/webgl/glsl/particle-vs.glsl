#pragma glslify: curl = require(glsl-curl-noise)

//varying vec2 vUv;
varying vec3 vPosition;

uniform float time;

void main() {

    //vUv = uv;
    float multiplier = -3.5;

    vec3 curlP = curl(position + (time)) * (sin(sqrt(pow(position.x, 3.0) + pow(position.y, 3.0))) * (multiplier/2.0));
    curlP *= multiplier;

    vPosition = curlP;

    gl_PointSize = 1.0;

    vec4 mvPosition = modelViewMatrix * vec4( curlP, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

}
