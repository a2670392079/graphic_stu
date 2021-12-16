precision mediump float;

uniform vec4 u_color;
varying float vP;
void main()
{
    gl_FragColor.xyz=u_color.xyz;
    gl_FragColor.a=(1.-vP)*u_color.a;
}