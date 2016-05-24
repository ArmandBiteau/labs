uniform float time;

void main() {

    vec3 pos = position;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

    gl_PointSize = 1.0;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
