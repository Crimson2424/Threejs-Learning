uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl

#include ../includes/directionalLight.glsl

#include ../includes/pointLight.glsl


void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    //Light
    vec3 light = vec3(0.0);
    light += ambientLight(
        vec3(1.0),  //lightColor 
        0.03        //LightIntensity
        );
    light += directionalLight(
        vec3( 0.1, 0.1, 1.0),    //lightColor 
        1.0,                     //LightIntensity
        normal,                  //normal
        vec3(0.0, 0.0, 3.0),     //Light Position
        viewDirection,           //View Direction
        20.0                    //Specular power
        );
    light += pointLight(
        vec3( 1.0, 0.1, 0.1),    //lightColor 
        1.0,                     //LightIntensity
        normal,                  //normal
        vec3(0.0, 2.5, 0.0),     //Light Position
        viewDirection,           //View Direction
        20.0,                   //Specular power
        vPosition,               //Position
        0.25                    //Light Decay
        );
    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}