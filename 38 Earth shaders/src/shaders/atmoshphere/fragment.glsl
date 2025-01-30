uniform vec3 uSunDirection;
uniform vec3 uAtmoshpereDayColor;
uniform vec3 uAtmoshperetwilightColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    //Sun Direction  
    float sunOrientation = dot(uSunDirection, normal);    

    //Atmoshphere
    float atmoshphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmoshphereColor = mix(uAtmoshperetwilightColor, uAtmoshpereDayColor, atmoshphereDayMix);
    color += atmoshphereColor;

    //Alpha
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);

    float dayAlpha = smoothstep(-0.5, 0.0, sunOrientation);

    float alpha = edgeAlpha * dayAlpha;

    // Final color
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}