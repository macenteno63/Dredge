#include "../../../lygia/generative/pnoise.glsl"
varying vec2 vUv;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uSpeed;
uniform float uRepeat;
uniform int uNoiseType;
uniform float uFoam;
uniform float uFoamTop;
uniform vec2 uBoatPosition; // Add uniform for boat position
uniform float uRippleStrength; // Add uniform for ripple strength

void main() {
  float adjustedTime = uTime * uSpeed;

  // NOISE GENERATION
  float noise = pnoise(vec3(vUv * uRepeat, adjustedTime * 0.5), vec3(100.0, 24.0, 112.0));

  // FOAM
  noise = smoothstep(uFoam, uFoamTop, noise);

  // RIPPLE EFFECT
  // float distanceToBoat = distance(vUv, uBoatPosition);
  // float rippleEffect = exp(-distanceToBoat * uRippleStrength);
  //noise += rippleEffect;

  // COLOR
  vec3 intermediateColor = uColor * 2.0;
  vec3 topColor = intermediateColor * 3.0;
  vec3 finalColor = uColor;
  finalColor = mix(uColor, intermediateColor, step(0.01, noise));
  finalColor = mix(finalColor, topColor, step(1.0, noise));

  gl_FragColor = vec4(finalColor, uOpacity);
}