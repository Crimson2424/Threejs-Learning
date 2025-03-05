uniform vec3 uColorWaterDeep;
uniform vec3 ucolorWaterSurface;
uniform vec3 ucolorSand;
uniform vec3 ucolorGrass;
uniform vec3 ucolorSnow;
uniform vec3 ucolorRock;

varying vec3 vPosition;
varying float vUpDot;

#include ../includes/simplexNoise2d.glsl

void main(){
    //Color
    vec3 color = vec3(1.0);

    //Water
    float surfaceWaterMix = smoothstep(-1.0, -0.1, vPosition.y);
    color = mix(uColorWaterDeep, ucolorWaterSurface, surfaceWaterMix);

    //Sand
    float sandMix = step(-0.1, vPosition.y);
    color = mix(color, ucolorSand, sandMix);

    //Grass
    float grassMix = step(-0.06, vPosition.y);
    color = mix(color, ucolorGrass, grassMix);

    //Rock
    float rockMix = vUpDot;
    rockMix = 1.0 - step(0.8, rockMix);
    rockMix *= step(-0.06, vPosition.y);
    color = mix(color, ucolorRock, rockMix);

    //Snow
    float snowThreshold = 0.45;
    snowThreshold += simplexNoise2d(vPosition.xz * 15.0) * 0.1;
    float snowMix = step(snowThreshold, vPosition.y);
    color = mix(color, ucolorSnow, snowMix);

    //Rock

    //Final Color
    csm_DiffuseColor = vec4(color, 1.0);
}