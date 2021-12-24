#ifdef GL_ES

precision highp float;

#endif

varying vec2 vUv;

uniform float u_time;

vec2 random2(vec2 st){
    
    st=vec2(dot(st,vec2(127.1,311.7)),
    
    dot(st,vec2(269.5,183.3)));
    
    return fract(sin(st)*43758.5453123);
    
}

void main(){
    
    /* 
    vec2 st = vUv * 10.0;
    float d = 1.0;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    vec2 p = random2(i_st);
    
    d = distance(f_st, p);

    gl_FragColor.rgb = vec3(d);
    gl_FragColor.a = 1.0; */
    
    vec2 st=vUv*10.;
    
    float d=1.;
    
    vec2 i_st=floor(st);
    
    vec2 f_st=fract(st);
    
    for(int i=-1;i<=1;i++){
        
        for(int j=-1;j<=1;j++){
            
            vec2 neighbor=vec2(float(i),float(j));
            
            vec2 p=random2(i_st+neighbor);
            
            p=.5+.5*sin(u_time+6.2831*p);
            
            d=min(d,distance(f_st,neighbor+p));
            
        }
        
    }
    
    gl_FragColor.rgb=vec3(d)+step(d,.03);
    
    gl_FragColor.a=1.;
    
}
