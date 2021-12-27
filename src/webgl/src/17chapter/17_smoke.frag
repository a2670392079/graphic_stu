#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform sampler2D tMap;
uniform float u_time;

void main() {
    vec3 smoke = vec3(0);
    if(u_time <= 3000.0){
        vec2 st = vUv - vec2(0.5);
        float d = length(st);
        smoke = vec3(1.0 - smoothstep(0.05, 0.055, d));
    }
    vec3 diffuse = texture2D(tMap, vUv).rgb;
    gl_FragColor.rgb = diffuse + smoke;
    gl_FragColor.a = 1.0;
}