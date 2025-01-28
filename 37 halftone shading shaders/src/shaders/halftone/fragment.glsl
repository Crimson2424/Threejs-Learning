uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uShadowRepetitions;
uniform vec3 uShadowColor;
uniform float uLightRepetitions;
uniform vec3 uLightColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl

vec3 halftone(vec3 color, float repetitions, vec3 direction, float low, float high, vec3 pointColor, vec3 normal){
    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);
    
    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= repetitions;
    uv = mod(uv, 1.0);

    float point = distance(uv, vec2(0.5));
    point = 1.0 - step(0.5 * intensity, point);
    return mix(color, pointColor, point);

}

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = uColor;

    //Light
    vec3 light = vec3(0.0);
    light += ambientLight(
        vec3(1.0),   //Light Color
        1.0         //Light Intensity
    );
    light += directionalLight(
        vec3(1.0,1.0,1.0),      //LightColor
        1.0,                    //Light Intensity
        normal,                 //Normal
        vec3(1.0, 1.0, 0.0),    //Light Position
        viewDirection,          //View Direction
        1.0                     //Specular power
    );


    color *= light;

    //Halftone
    color = halftone(
        color,                          //Input Color
        uShadowRepetitions,             //Repetitions
        vec3(0.0, - 1.0, 0.0),          //Direction
        -0.8,                           //Low
        1.5,                            //High
        uShadowColor,                   //Point Color
        normal                          //Normal
    );

    //Halftone
    color = halftone(
        color,                          //Input Color
        uLightRepetitions,              //Repetitions
        vec3(1.0, 1.0, 0.0),            //Direction
        0.5,                            //Low
        1.5,                            //High
        uLightColor,                    //Point Color
        normal                          //Normal
    );
    

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}