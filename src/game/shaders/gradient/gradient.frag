uniform vec3 color1;
uniform vec3 color2;

uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
  vec4 color    = texture2D(tDiffuse, vUv);
  vec3 gradient = mix(color1, color2, smoothstep(0.4,0.6,vUv.y));
  gl_FragColor  = vec4(gradient * color.rgb, color.a);
}
