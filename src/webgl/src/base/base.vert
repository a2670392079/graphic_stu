precision highp float;
attribute vec2 a_vertexPostition;
attribute vec2 uv;
varying vec2 vUv;
void main() {
    gl_PointSize = 1.0;
    vUv = uv;
    gl_Position = vec4(a_vertexPostition, 1, 1);
}