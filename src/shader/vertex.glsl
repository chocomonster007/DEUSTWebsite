varying float vModelPositionY;
varying float vModelPositionX;

uniform float uTime;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vModelPositionY = modelPosition.y;
    vModelPositionX = modelPosition.x;
    vec4 viewPositon = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPositon;

    gl_Position = projectedPosition;
}