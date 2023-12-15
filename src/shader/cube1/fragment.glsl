uniform float uTaux;

void main(){
    
    float transparence = step(-0.7,uTaux);
    gl_FragColor = vec4(1.0,1.0,0.0,transparence);
}