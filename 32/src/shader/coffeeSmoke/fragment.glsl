uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main(){
    //Scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;

    //smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;

    //remap 
    smoke = smoothstep(0.4, 1.0, smoke); //0.4 tak ki values 0 rahegi and dheere dheere fir 1 tak transition hoga 0.4 ke baad ki values ka

    //fade edges
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);

    //FInal color
    gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}