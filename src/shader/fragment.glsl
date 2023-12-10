varying float vModelPositionY;
varying float vModelPositionX;
uniform float uTaux;

void main(){
        float colorY = step(uTaux,vModelPositionY);

    gl_FragColor =  vec4(1.0,1.0,colorY, 1.0);
}