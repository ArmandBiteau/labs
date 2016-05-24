precision highp float;

uniform float time;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 lightPosition;

// chunk(shadowmap_pars_fragment);

void main(void) {

    float dist = sqrt( pow(vPosition.x, 2.0) + pow(vPosition.y, 2.0) );

    vec3 lightDirection = normalize(lightPosition - vWorldPosition);

    vec3 outgoingLight = vec3(1.0);

    // float c = 0.5 + max(0.0, dot(vNormal, lightDirection)) * 0.4;
    float c = 0.7;

    float alpha = 1.0;

    if (dist < 100.0 ) {
        discard;
    }

    gl_FragColor = vec4( c, c, c, alpha );

}
