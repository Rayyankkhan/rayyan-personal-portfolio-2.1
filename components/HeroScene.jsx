'use client';

/**
 * Hero 3D scene (raw three.js, no react-three-fiber to keep the bundle small).
 *
 *  - Morphing "liquid" orb: icosahedron displaced by simplex noise in a vertex shader,
 *    shaded with a fresnel rim + two-colour gradient taken from the ACTIVE THEME.
 *  - Wireframe shell + soft particle field for depth.
 *  - Reacts to the pointer (parallax + a bulge towards the cursor) and to page scroll.
 *  - Pauses when off-screen or the tab is hidden; renders ONE still frame when the
 *    visitor prefers reduced motion; cleans up every GPU resource on unmount.
 *  - Colours are read from the CSS variables (--accent, --accent-2, --ink-950) and
 *    refreshed on the "themechange" event, so the theme switcher recolours the scene live.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Simplex noise (Ashima Arts / Stefan Gustavson, MIT) */
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const ORB_VERT = /* glsl */ `
${NOISE_GLSL}
uniform float uTime;
uniform vec2 uMouse;
uniform float uStrength;
varying vec3 vN;
varying vec3 vMv;
varying float vNoise;

float field(vec3 n){
  // two soft octaves: big slow swells + a little detail
  float n1 = snoise(n * 0.95 + vec3(0.0, uTime * 0.18, uTime * 0.09));
  float n2 = snoise(n * 2.1 - vec3(uTime * 0.14)) * 0.26;
  return n1 + n2;
}
vec3 surf(vec3 n, float r, vec3 mdir){
  float bulge = pow(max(dot(n, mdir), 0.0), 7.0) * 0.16; // gentle push towards the cursor
  return n * (r + field(n) * uStrength + bulge);
}
void main(){
  vec3 n = normalize(normal);
  float r = length(position);
  vec3 mdir = normalize(vec3(uMouse.x, uMouse.y, 0.85));

  // smooth analytic normal: displace two nearby points and take the cross product
  vec3 up = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 t = normalize(cross(up, n));
  vec3 b = cross(n, t);
  float e = 0.02;
  vec3 p  = surf(n, r, mdir);
  vec3 pt = surf(normalize(n + t * e), r, mdir);
  vec3 pb = surf(normalize(n + b * e), r, mdir);
  vec3 nn = normalize(cross(pt - p, pb - p));

  vNoise = field(n);
  vN = normalize(normalMatrix * nn);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vMv = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const ORB_FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uBg;
uniform float uOpacity;
varying vec3 vN;
varying vec3 vMv;
varying float vNoise;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(-vMv);

  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  float key  = max(dot(N, normalize(vec3(0.55, 0.8, 0.65))), 0.0);
  float rim  = max(dot(N, normalize(vec3(-0.8, -0.2, 0.4))), 0.0);

  float t = smoothstep(-0.9, 0.9, vNoise + N.y * 0.55);
  vec3 deep = mix(uColorA, uColorB, 0.35) * 0.42; // shadow tone stays in the theme's hue (no muddy browns)
  vec3 base = mix(deep, uColorA, t);

  vec3 col = base * (0.16 + 0.84 * key);
  col += rim * uColorB * 0.22;
  col += fres * mix(uColorA, uColorB, 0.55) * 1.15;
  col = mix(uBg, col, 0.96);
  col += (hash(gl_FragCoord.xy) - 0.5) * (2.0 / 255.0); // dither: no banding on gradients

  gl_FragColor = vec4(col, uOpacity);
}
`;

const DOT_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixel;
uniform float uSize;
attribute float aSeed;
varying float vTw;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.35 + aSeed * 6.2831) * 0.08;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vTw = 0.55 + 0.45 * sin(uTime * 0.8 + aSeed * 40.0);
  gl_PointSize = uSize * uPixel * (1.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const DOT_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vTw;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor, a * a * uOpacity * vTw);
}
`;

/* "167 139 250" (CSS variable) -> THREE.Color.
   Custom shaders write straight to the canvas, so their colours are stored "as is" (LinearSRGBColorSpace = no conversion).
   Built-in materials (the wireframe) pass SRGBColorSpace so three converts them correctly. */
function readVar(name, target, space = THREE.LinearSRGBColorSpace) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r, g, b] = raw.split(/\s+/).map(Number);
  if ([r, g, b].some((v) => Number.isNaN(v))) return target;
  return target.setRGB(r / 255, g / 255, b / 255, space);
}

export default function HeroScene({ onReady }) {
  const mountRef = useRef(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !small,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // WebGL unavailable: the CSS fallback in <HeroVisual/> stays visible
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 8);

    const colorA = new THREE.Color();
    const colorB = new THREE.Color();
    const colorBg = new THREE.Color();
    const readTheme = () => {
      readVar('--accent', colorA);
      readVar('--accent-2', colorB);
      readVar('--ink-950', colorBg);
    };
    readTheme();

    const group = new THREE.Group();
    scene.add(group);

    /* ── Orb ── */
    const orbGeo = new THREE.IcosahedronGeometry(1.7, small ? 40 : 64);
    const orbMat = new THREE.ShaderMaterial({
      vertexShader: ORB_VERT,
      fragmentShader: ORB_FRAG,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uStrength: { value: 0.2 },
        uColorA: { value: colorA },
        uColorB: { value: colorB },
        uBg: { value: colorBg },
        uOpacity: { value: 1 },
      },
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    group.add(orb);

    /* ── Wireframe shell ── */
    const shellGeo = new THREE.IcosahedronGeometry(2.35, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    readVar('--accent', shellMat.color, THREE.SRGBColorSpace);
    const shell = new THREE.Mesh(shellGeo, shellMat);
    group.add(shell);

    /* ── Particles ── */
    const COUNT = small ? 450 : 1100;
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 3.1 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      pos[i * 3 + 2] = r * Math.cos(phi);
      seed[i] = Math.random();
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    dotGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: DOT_VERT,
      fragmentShader: DOT_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixel: { value: renderer.getPixelRatio() * 4 },
        uSize: { value: 7 },
        uColor: { value: colorB },
        uOpacity: { value: 0.85 },
      },
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    group.add(dots);

    /* ── Sizing ── */
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole orb visible on narrow / tall containers (half-width 2.6 must fit)
      camera.position.z = Math.max(8, 7.55 / camera.aspect);
      camera.updateProjectionMatrix();
      dotMat.uniforms.uPixel.value = renderer.getPixelRatio() * 4 * THREE.MathUtils.clamp(h / 520, 0.7, 1.4);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* ── Input ── */
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onPointer = (e) => {
      const r = mount.getBoundingClientRect();
      if (!r.width || !r.height) return;
      target.x = THREE.MathUtils.clamp(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 0.9, -1, 1);
      target.y = THREE.MathUtils.clamp((-(e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 0.9, -1, 1);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let scrollP = 0;
    const onScroll = () => {
      const h = document.getElementById('top')?.offsetHeight || window.innerHeight;
      scrollP = THREE.MathUtils.clamp(window.scrollY / h, 0, 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onTheme = () => {
      readTheme();
      readVar('--accent', shellMat.color, THREE.SRGBColorSpace);
      if (reduceMotion) renderFrame(0); // static mode has no loop: repaint once
    };
    window.addEventListener('themechange', onTheme);

    /* ── Render loop ── */
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;
    let visible = true;
    let tabVisible = !document.hidden;
    let elapsed = 0;

    function renderFrame(dt) {
      elapsed += dt;
      smooth.x += (target.x - smooth.x) * Math.min(1, dt * 3.2);
      smooth.y += (target.y - smooth.y) * Math.min(1, dt * 3.2);

      orbMat.uniforms.uTime.value = elapsed;
      dotMat.uniforms.uTime.value = elapsed;
      orbMat.uniforms.uMouse.value.set(smooth.x, smooth.y);

      group.rotation.y = elapsed * 0.08 + smooth.x * 0.45 + scrollP * 1.2;
      group.rotation.x = -smooth.y * 0.3 + scrollP * 0.3;
      shell.rotation.y = -elapsed * 0.05;
      shell.rotation.z = elapsed * 0.03;
      dots.rotation.y = elapsed * 0.02;

      group.position.y = -scrollP * 1.4;
      group.scale.setScalar(1 - scrollP * 0.22);
      orbMat.uniforms.uOpacity.value = 1 - scrollP * 0.55;

      renderer.render(scene, camera);
    }

    const loop = () => {
      raf = requestAnimationFrame(loop);
      renderFrame(Math.min(clock.getDelta(), 0.05));
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      clock.getDelta(); // discard the time spent paused
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => (visible && tabVisible ? start() : stop());

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(mount);
    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    renderFrame(0.016);
    if (reduceMotion) renderFrame(2.4); // pleasant still pose instead of the t=0 sphere
    else start();
    readyRef.current?.();

    /* ── Cleanup (free every GPU resource) ── */
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('themechange', onTheme);
      document.removeEventListener('visibilitychange', onVisibility);
      orbGeo.dispose();
      orbMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
