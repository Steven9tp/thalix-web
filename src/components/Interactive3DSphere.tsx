import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Interactive3DSphereProps {
  onExplore?: () => void;
}

export const Interactive3DSphere: React.FC<Interactive3DSphereProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Custom Shader Material for Distorted 3D Sphere
    const vertexShader = `
      uniform float uTime;
      uniform float uDistortion;
      uniform vec2 uMouse;
      uniform float uHover;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;

      // Classic Perlin 3D Noise by Stefan Gustavson
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

      float cnoise(vec3 P){
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
      }

      void main() {
        vUv = uv;
        vNormal = normal;

        // Base noise oscillation
        float noise = cnoise(position * 1.5 + vec3(uTime * 0.45));
        
        // Secondary harmonic noise
        float detailNoise = cnoise(position * 3.2 - vec3(uTime * 0.7)) * 0.4;
        
        // Mouse influence distortion
        vec3 mouseVec = vec3(uMouse.x * 2.0, uMouse.y * 2.0, 0.5);
        float mouseDist = distance(position, mouseVec);
        float mouseEffect = smoothstep(2.5, 0.0, mouseDist) * (0.35 + uHover * 0.45);

        float displacement = (noise + detailNoise) * (uDistortion + mouseEffect);
        vDisplacement = displacement;

        vec3 newPosition = position + normal * displacement;
        vPosition = newPosition;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      uniform vec2 uMouse;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;

      void main() {
        // Normal computation and view direction
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(-vPosition);
        
        // Fresnel rim effect (metallic and glossy sheen)
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);

        // Gradient based on displacement and height
        float mixFactor = smoothstep(-0.35, 0.45, vDisplacement);
        vec3 baseColor = mix(uColorA, uColorB, mixFactor);
        
        // Add subtle accent highlights
        vec3 finalColor = mix(baseColor, uColorC, fresnel * 0.85);

        // Specular light point tracking mouse
        vec3 lightPos = vec3(uMouse.x * 3.0, uMouse.y * 3.0, 3.5);
        vec3 lightDir = normalize(lightPos - vPosition);
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

        finalColor += vec3(0.95) * spec * 0.7;
        finalColor += vec3(fresnel * 0.35);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uDistortion: { value: 0.28 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      // Modern High-Contrast Sculptural Chrome & Obsidian Metallic Material
      uColorA: { value: new THREE.Color(0x0f1115) }, // Rich dark obsidian
      uColorB: { value: new THREE.Color(0x383d47) }, // Brushed carbon titanium
      uColorC: { value: new THREE.Color(0x9ca3af) }  // Polished chrome sheen
    };

    // Dense smooth sphere geometry
    const geometry = new THREE.IcosahedronGeometry(1.6, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse and Touch Interaction Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouse.targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouse.isHovering = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.isHovering = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update shader uniforms
      uniforms.uTime.value = elapsedTime;
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uHover.value += ((mouse.isHovering ? 1.0 : 0.0) - uniforms.uHover.value) * 0.08;

      // Dynamic rotation responsive to mouse
      mesh.rotation.y = elapsedTime * 0.15 + mouse.x * 0.8;
      mesh.rotation.x = elapsedTime * 0.08 - mouse.y * 0.8;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseleave", handlePointerLeave);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#F7F9FC] select-none">
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric Studio Ambient Light & Grid */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(247,249,252,0.85)_85%)]" />
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Avant-Garde Minimal UI Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center h-full pointer-events-none">
        {/* Center Minimal Typography */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black uppercase tracking-tighter text-black leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            THALIX
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.4em] text-zinc-500 max-w-xl mx-auto">
            Materia Digital • Diseño • Innovación
          </p>
        </div>
      </div>
    </div>
  );
};
