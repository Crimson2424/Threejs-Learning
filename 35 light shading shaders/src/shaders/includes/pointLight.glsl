vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay){
    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);    //to calculate length of an vector
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(- lightDirection, normal);

    //shading
    float shading = dot(lightDirection, normal);
    shading = max(0.0, shading);                       //so that shading won't go below 0 or in -ve

    //specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);  

    //Decay
    float decay = 1.0 - lightDistance * lightDecay;      //lightDecay se multiply isliye kiya he taaki decay jaldi na ho
    decay = max(0.0, decay); //taaki decay 0 se neeche na jaye

    return lightColor * lightIntensity * (shading + specular) * decay;
}