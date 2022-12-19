uniform sampler2D tDiffuse;
uniform sampler2D[DIM] gradations;

varying vec2 vUv;

vec4 mapColor(int index, vec2 uv) {
  ???REPLACE
  return texture2D(gradations[0], uv);
}

const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);

float luminance (vec3 color) {
  return dot(color.rgb, luminanceWeighting);
}

int map(float x, float in_min, float in_max, float out_min, float out_max){
  float t =  (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  return int(t);
}


void main() {
  vec4 color    = texture2D(tDiffuse, vUv);

  int index = map(luminance(color.rgb), 0., 1., 0., float(DIM));

  gl_FragColor  = vec4(mapColor(index, vUv).rgb, color.a);
}
