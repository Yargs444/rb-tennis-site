import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useInViewport from "../../hooks/useInViewport";

/* ---------------------------------------------------------------
   BOLINHA DE TÊNIS 3D
   Feita 100% em código (sem imagem), por isso é leve.
   - gira sozinha e "quica" de leve
   - gira mais rápido conforme a pessoa rola a página (scroll)
   - só desenha quando está visível na tela (economiza bateria)
   --------------------------------------------------------------- */

const BALL_COLOR = "#d6ee3c";
const SEAM_COLOR = "#f3f1e7";

/** Textura "felpuda": ruído claro/escuro sobre o amarelo. */
function useFeltTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const image = ctx.createImageData(size, size);
    for (let i = 0; i < image.data.length; i += 4) {
      const v = 200 + Math.random() * 55;
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
    return texture;
  }, []);
}

/** Curva da costura branca da bolinha (formato clássico de "S" em volta). */
function useSeamGeometry() {
  return useMemo(() => {
    const points = [];
    const a = 0.6;
    const b = 0.4;
    const c = 2 * Math.sqrt(a * b);
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2;
      const p = new THREE.Vector3(
        a * Math.cos(t) + b * Math.cos(3 * t),
        a * Math.sin(t) - b * Math.sin(3 * t),
        c * Math.sin(2 * t)
      );
      points.push(p.normalize().multiplyScalar(0.992));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, 300, 0.026, 8, true);
  }, []);
}

function Ball({ scrollProgress }) {
  const group = useRef();
  const felt = useFeltTexture();
  const seam = useSeamGeometry();

  useFrame((state, delta) => {
    if (!group.current) return;
    const scroll = scrollProgress ? scrollProgress.get() : 0;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x = 0.35 + scroll * 6; // gira com o scroll
    group.current.position.y = Math.abs(Math.sin(t * 1.6)) * 0.12 - 0.06; // quique leve
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.3]}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={BALL_COLOR} map={felt} roughness={0.95} metalness={0} />
      </mesh>
      <mesh geometry={seam}>
        <meshStandardMaterial color={SEAM_COLOR} roughness={0.7} />
      </mesh>
    </group>
  );
}

export default function TennisBall3D({ scrollProgress, className }) {
  const [ref, visible] = useInViewport();

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.3], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        {/* luz de refletor vindo de cima/esquerda */}
        <directionalLight position={[-3, 4, 4]} intensity={2.6} />
        {/* luz de contorno esverdeada, como o reflexo da quadra */}
        <directionalLight position={[3, -2, -2]} intensity={1.2} color="#7fd3a0" />
        <Ball scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
