precision highp float;

// varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vPosition;

// chunk(shadowmap_pars_vertex);

void main() {

    vPosition = position;

    vec3 vNormal = normalMatrix * vec3(normal * 0.2);

    vec4 worldPosition = modelMatrix * vec4(vPosition, 1.0);

    // chunk(shadowmap_vertex);

    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
