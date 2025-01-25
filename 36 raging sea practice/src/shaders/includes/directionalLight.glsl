vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower){
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);

    //shading
    float shading = dot(lightDirection, normal);
    shading = max(0.0, shading);                       //so that shading won't go below 0 or in -ve

    //specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);  

    return lightColor * lightIntensity * (shading + specular);
}