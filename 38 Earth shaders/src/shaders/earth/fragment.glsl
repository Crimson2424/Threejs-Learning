uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmoshpereDayColor;
uniform vec3 uAtmoshperetwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    //Sun Direction
    
    float sunOrientation = dot(uSunDirection, normal); 

    //Day / Night
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color =  mix(nightColor, dayColor, dayMix);

    //Specular clouds color
    vec2 specularCloudsColor = texture(uSpecularCloudsTexture, vUv).rg;       

    //Clouds
    float cloudMix = smoothstep(0.5, 1.0, specularCloudsColor.g);
    cloudMix *= dayMix;
    color = mix(color, vec3(1.0), cloudMix);

    //Fresnel
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    //Atmoshphere
    float atmoshphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmoshphereColor = mix(uAtmoshperetwilightColor, uAtmoshpereDayColor, atmoshphereDayMix);
    color = mix(color, atmoshphereColor, fresnel * atmoshphereDayMix);

    //Specular 
    vec3 reflection = reflect(-uSunDirection, normal);
    float specular = -dot(reflection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 32.0);
    specular *= specularCloudsColor.r;
    
    vec3 specularColor = mix(vec3(1.0), atmoshphereColor, fresnel);
    color += specular * specularColor;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}