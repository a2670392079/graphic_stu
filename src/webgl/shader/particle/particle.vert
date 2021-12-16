
attribute vec2 position;

uniform float u_rotation;

uniform float u_time;

uniform float u_duration;

uniform float u_scale;

uniform vec2 u_dir;

varying float vP;

const float PI=3.14159265359;

void main(){
    float p=min(1.,u_time/u_duration);
    float rad=u_rotation+PI*5.*p;
    float scale=u_scale*p*(2.-p);
    vec2 offset=2.*u_dir*p*p;
    mat3 translateMatrix=mat3(
        1.,0.,0.,
        0.,1.,0.,
        offset.x,offset.y,1.
    );
    mat3 rotateMartix=mat3(
        cos(rad),sin(rad),0.,
        -sin(rad),cos(rad),0.,
        0.,0.,1.
    );
    mat3 scaleMatrix=mat3(
        scale,0.,0.,
        0.,scale,0.,
        0.,0.,1.
    );
    gl_PointSize=1.;
    
    vec3 pos=translateMatrix*rotateMartix*scaleMatrix*vec3(position,1.);
    
    gl_Position=vec4(pos,1.);
    
    vP=p;
}