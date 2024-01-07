uniform float uTaux;
uniform vec3 uColor;

void main(){
    
    float transparence = step(-0.7,uTaux);
    gl_FragColor = vec4(uColor,transparence);
}