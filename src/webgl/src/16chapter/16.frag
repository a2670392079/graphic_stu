precision highp float;

varying vec2 vUv;

float random(float x){
    return fract(sin(x*1000.0));
}

void main(){
    vec2 st=vUv-vec2(.5);
    st*=10.;
    float i=floor(st.x);
    float j=floor(st.y);
    float d=random(i);
    // float d = mix(random(i), random(i + 1.0), f);
    // float d = mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
    // float d = mix(random(i), random(i + 1.0), f * f * (3.0 - 2.0 * f));
    gl_FragColor.rgb=(smoothstep(st.y-0.05,st.y,d)-smoothstep(st.y,st.y+.05,d))*vec3(1.);
    gl_FragColor.a=1.;
}