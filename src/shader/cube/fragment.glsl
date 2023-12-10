varying float vModelPositionY;
varying float vModelPositionX;
varying float vModelPositionZ;

uniform float uTaux;
uniform float uTime;

void main(){
        float colorY = 1.0-step(uTaux+sin(vModelPositionX*15.0+uTime*8.0)*0.02+sin(vModelPositionZ*15.0+uTime*8.0)*0.02,vModelPositionY);

    gl_FragColor =  vec4(1.0,1.0,0.0, colorY);
}