varying vec4 vModelPosition;

void main(){
    vec4 color;
    if(vModelPosition.y > 0.0){
        color = vec4(1.0,1.0,1.0,1.0);
    }else{
        color = vec4(1.0,1.0,0.0,1.0);
    }

    gl_FragColor = color;
}