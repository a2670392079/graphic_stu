#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
varying vec2 vUv;


/* float random(float x){
    return fract(sin(x*1000.0));
}

void main(){
    vec2 st=vUv-vec2(.5);
    st*=10.;
    float i=floor(st.x);
    float j=fract(st.x);
    // float d=random(i);
    // float d = mix(random(i), random(i + 1.0), j);
    // float d = mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, j));
    float d = mix(random(i), random(i + 1.0), j * j * (3.0 - 2.0 * j));
    gl_FragColor.rgb=(smoothstep(st.y-0.05,st.y,d)-smoothstep(st.y,st.y+.05,d))*vec3(1.);
    gl_FragColor.a=1.;
} */

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
highp float noise(vec2 st){
    vec2 i=floor(st);
    vec2 f=fract(st);
    vec2 u=f*f*(3.-2.*f);
    return mix(
        mix(random(i+vec2(0.,0.)),random(i+vec2(1.,0.)),u.x),
        mix(random(i+vec2(0.,1.)),random(i+vec2(1.,1.)),u.x),
        u.y
    );
}
void main(){
    
    // vec2 st=vUv*20.;
    
    // gl_FragColor.rgb=vec3(noise(st));
    
    // gl_FragColor.a=1.;
    vec2 st=mix(vec2(-10,-10),vec2(10,10),vUv);
    float d=distance(st,vec2(0));
    d*=noise(u_time+st);
    d=smoothstep(0.,1.,d)-step(1.,d);
    gl_FragColor.rgb=vec3(d);
    gl_FragColor.a=1.0;
    
}
