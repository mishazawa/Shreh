uniform vec3 color1;
uniform vec3 color2;

uniform sampler2D tDiffuse;
varying vec2 vUv;

const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);

float blendOverlay(float base, float blend) {
  return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
  return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
  return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

vec3 blendHardLight(vec3 base, vec3 blend) {
  return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
  return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}


void main() {
  vec4 color    = texture2D(tDiffuse, vUv);
  vec3 gradient = mix(color1, color2, smoothstep(0.25, 0.75, vUv.y));
  float luminance = dot(color.rgb, luminanceWeighting);
  gl_FragColor  = vec4(blendHardLight(color.rgb, gradient, luminance), color.a);
}
