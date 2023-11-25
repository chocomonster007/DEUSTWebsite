varying float vModelPosition;

uniform float uTime;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vModelPosition = modelPosition.y + sin(uTime*10.0)*0.05 + modelPosition.x;
    vec4 viewPositon = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPositon;

    gl_Position = projectedPosition;
}