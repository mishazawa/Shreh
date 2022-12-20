uniform sampler2D tDiffuse;
uniform vec3 camera;
uniform vec3[NUM_OBJECTS] objects;

varying vec2 vUv;

float opU( float d1, float d2 ){
    return min( d1, d2 );
}

float sdSphere(vec3 p, float s) {
  return length(p)-s;
}

float getDist (vec3 p) {
  float dist = float(MAX_DIST);

  for (int i = 0; i < NUM_OBJECTS; i++) {
    vec3 obj = objects[i];
    dist = opU(sdSphere(p - obj, 1.), dist);
  }
  return dist;
}

float raymarch (vec3 ro, vec3 rd) {
  float dist = .0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * dist;

    float surfDist = getDist(p);
    dist += surfDist;

    if (dist > MAX_DIST || surfDist < SURF_DIST) break;
  }
  return dist;
}

void main() {
  vec2 uv = vUv * .5 - .25;

  vec3 rd = normalize(vec3(uv, 1.));

  vec3 color = vec3(raymarch(camera, rd) / (MAX_DIST - SURF_DIST)) ;
  gl_FragColor  = vec4(color, 1.);
}
