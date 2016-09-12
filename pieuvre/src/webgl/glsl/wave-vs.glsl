precision highp float;

// varying vec3 vNormal;
varying vec3 vWorldPosition;

varying vec3 vPosition;

uniform float time;

// chunk(shadowmap_pars_vertex);

void main() {

    float t = time*40.0;

    vPosition = position;

    float dist = sqrt( pow(vPosition.x, 2.0) + pow(vPosition.y, 2.0) );

    vPosition.z = sin( -t + dist * 0.12 ) * ( pow(dist/12.0, 2.0) / 20.0 ) * 1.5;

    vPosition.x += vPosition.x * vPosition.z/150.0;
    vPosition.y += vPosition.y * vPosition.z/150.0;

    vec4 worldPosition = modelMatrix * vec4(vPosition, 1.0);

    // chunk(shadowmap_vertex);

    gl_PointSize = 1.0;

    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
