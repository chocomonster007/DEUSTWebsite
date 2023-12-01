varying float vModelPosition;
varying float test;

uniform float uTime;
uniform float uTaux;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    test = step(uTaux,modelPosition.y);
    vec4 viewPositon = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPositon;

    gl_Position = projectedPosition;
}