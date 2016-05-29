precision highp float;

varying vec3 vPosition;
// varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform vec3 lightColor;
uniform vec3 middleColor;
uniform vec3 darkColor;
uniform vec3 fogColor;

uniform vec3 lightPosition;

uniform float time;

// chunk(shadowmap_pars_fragment);

void main(void) {

    vec3 lightDirection = normalize(lightPosition - vWorldPosition);

    vec3 outgoingLight = vec3(1.0);

    // chunk(shadowmap_fragment);

    vec3 ratioDarkColor = (vPosition.z+150.0)/+150.0 * darkColor;
    vec3 ratioLightColor = (vPosition.z-125.0)/-150.0 * lightColor;

    vec4 color = vec4((ratioDarkColor+ratioLightColor)*0.5, 1.0);

    color.a = (630.0 - abs(vPosition.y - 80.0))/100.0;

    color.a *= min(1.0, time*7.5);

    gl_FragColor = color;

}
