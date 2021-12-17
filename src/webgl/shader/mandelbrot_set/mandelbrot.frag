precision mediump float;
precision highp int;
varying vec2 vUv;

uniform vec2 center;
uniform float scale;
uniform int iterations;

vec2 f(vec2 z,vec2 c){
    return mat2(z,-z.y,z.x)*z+c;
}

void main(){
    vec2 uv=vUv;
    vec2 c=center+4.*(uv-vec2(.5))/scale;
    vec2 z=vec2(0.);
    bool escaped=false;
    int j;
    for(int i=0;i<65536;i++){
        if(i>iterations)break;
        j=i;
        z=f(z,c);
        if(length(z)>2.){
            escaped=true;
            break;
        }
    }
    // gl_FragColor.rgb=escaped?vec3(float(j))/float(iterations):vec3(0.);
    gl_FragColor.rgb=escaped?(vec3(float(j))/float(iterations)):vec3(0.0, 0.0, 0.0);
    gl_FragColor.a=1.;
}