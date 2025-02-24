#include ../includes/simplexNoise4d.glsl
uniform float uTime;
uniform float uDeltaTime;
uniform sampler2D uBase;
uniform float uFlowFieldInfluence;
uniform float uFlowFieldStrength;
uniform float uFlowFieldFrequency;

void main(){
    float time = uTime * 0.2;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture(uParticles, uv);
    vec4 base = texture(uBase, uv);

    //life span of particle is dead
    if(particle.a >= 1.0){
        particle.a = mod(particle.a, 1.0);
        particle.xyz = base.xyz;
    }

    //Life span of particle is alive
    else{
        //Strength
        float strength = simplexNoise4d(vec4(base.xyz * 0.2, time + 1.0));
        float influence = (uFlowFieldInfluence - 0.5) * (-2.0);
        strength = smoothstep(influence, 1.0, strength);

        // Flow Field
        vec3 flowField = vec3(                 //this will be the direction in which the particles will move
        simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 0.0, time)),
        simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 1.0, time)),
        simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 2.0, time))
        );
        flowField = normalize(flowField);
        particle.xyz += flowField * uDeltaTime * strength * uFlowFieldStrength;

        particle.a += uDeltaTime * 0.03;
    }

    

    gl_FragColor = particle;
}