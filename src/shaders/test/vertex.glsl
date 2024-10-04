#include ../includes/simplexNoise2d.glsl
uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;
uniform float uTime;

varying vec3 vPosition;
varying float vUpDot;

uniform float uRandomSeed;


float getElevation(vec2 position) {
    float elevation = 0.0;

    vec2 warpedPosition = position;
    warpedPosition += simplexNoise2d(warpedPosition * uPositionFrequency * uWarpFrequency + uRandomSeed) * uWarpStrength;

    elevation += simplexNoise2d(warpedPosition * uPositionFrequency + uRandomSeed) / 2.0;
    elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 2.0 + uRandomSeed) / 4.0;
    elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 4.0 + uRandomSeed) / 8.0;
    float elevationSign = sign(elevation);
    elevation = pow(abs(elevation), 1.5) * elevationSign;
    elevation *= uStrength;
    elevation -= 0.2;
    return elevation;
}

void main() {
    // Neighbours positions
    float shift = 0.01;
    vec3 positionA = position.xyz + vec3(shift, 0.0, 0.0);
    vec3 positionB = position.xyz + vec3(0.0, 0.0, -shift);
    float elevation = getElevation(csm_Position.xz);
    csm_Position.y += elevation;
    positionA.y += getElevation(positionA.xz);
    positionB.y += getElevation(positionB.xz);

    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);

    // Varyings
    vPosition = csm_Position;
    vUpDot = dot(csm_Normal, vec3(0.0, 1.0, 0.0));
}
