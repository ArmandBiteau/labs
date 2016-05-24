varying vec3 vPosition;
varying vec3 vColor;

uniform vec3 color;

void main() {

    //float a = 4.0 - abs( distance(  vPosition.xy, vec2(0.0)  ) );
    float a = 1.0;

    gl_FragColor = vec4( color , a );
}
