import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useInViewport from "../../hooks/useInViewport";

/* ---------------------------------------------------------------
   RAQUETE 3D
   Feita em código: aro, cordas, garganta e cabo.
   Conforme a pessoa rola a página, ela gira como num forehand.
   --------------------------------------------------------------- */

const FRAME_COLOR = "#1c211e";
const ACCENT_COLOR = "#d9f24b";
const STRING_COLOR = "#f3f1e7";
const GRIP_COLOR = "#111412";

const HEAD = { cx: 0, cy: 0.6, rx: 0.62, ry: 0.82 };

function ellipsePoint(angle, inset = 0) {
  return new THREE.Vector3(
    HEAD.cx + (HEAD.rx - inset) * Math.cos(angle),
    HEAD.cy + (HEAD.ry - inset) * Math.sin(angle),
    0
  );
}

/** Tubo que segue um pedaço da elipse da cabeça (do ângulo "from" ao "to"). */
function arcTube(from, to, radius, closed = false) {
  const points = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    points.push(ellipsePoint(from + ((to - from) * i) / steps));
  }
  const curve = new THREE.CatmullRomCurve3(points, closed);
  return new THREE.TubeGeometry(curve, steps, radius, 10, closed);
}

function straightTube(a, b, radius) {
  const curve = new THREE.LineCurve3(a, b);
  return new THREE.TubeGeometry(curve, 1, radius, 8, false);
}

function useRacketParts() {
  return useMemo(() => {
    const frame = arcTube(0, Math.PI * 2, 0.045, true);
    // detalhes amarelos nas laterais do aro
    const accents = [arcTube(-0.35, 0.35, 0.048), arcTube(Math.PI - 0.35, Math.PI + 0.35, 0.048)];

    // garganta: dois braços saindo da cabeça até o cabo
    const handleTop = new THREE.Vector3(0, -0.5, 0);
    const throat = [
      straightTube(ellipsePoint(Math.PI * 1.32), handleTop, 0.04),
      straightTube(ellipsePoint(Math.PI * 1.68), handleTop, 0.04),
    ];

    // cordas verticais e horizontais, cortadas no formato da cabeça
    const strings = [];
    const inset = 0.03;
    for (let x = -0.52; x <= 0.521; x += 0.075) {
      const half = (HEAD.ry - inset) * Math.sqrt(Math.max(0, 1 - (x / (HEAD.rx - inset)) ** 2));
      strings.push(straightTube(new THREE.Vector3(x, HEAD.cy - half, 0), new THREE.Vector3(x, HEAD.cy + half, 0), 0.006));
    }
    for (let y = -0.72; y <= 0.721; y += 0.075) {
      const half = (HEAD.rx - inset) * Math.sqrt(Math.max(0, 1 - (y / (HEAD.ry - inset)) ** 2));
      strings.push(
        straightTube(new THREE.Vector3(-half, HEAD.cy + y, 0), new THREE.Vector3(half, HEAD.cy + y, 0), 0.006)
      );
    }
    return { frame, accents, throat, strings };
  }, []);
}

function Racket({ scrollProgress }) {
  const group = useRef();
  const parts = useRacketParts();

  useFrame((state) => {
    if (!group.current) return;
    const p = scrollProgress ? scrollProgress.get() : 0.5; // 0 → 1 enquanto a seção passa
    const t = state.clock.elapsedTime;
    // movimento de forehand: a raquete "atravessa" de um lado para o outro
    group.current.rotation.y = THREE.MathUtils.lerp(-1.1, 1.1, p);
    group.current.rotation.z = THREE.MathUtils.lerp(0.75, -0.35, p);
    group.current.rotation.x = -0.2 + Math.sin(t * 0.8) * 0.05;
    group.current.position.y = 0.1 + Math.sin(t * 1.1) * 0.04;
  });

  return (
    <group ref={group} scale={0.95}>
      <mesh geometry={parts.frame}>
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.4} />
      </mesh>
      {parts.accents.map((geometry, i) => (
        <mesh key={`a${i}`} geometry={geometry}>
          <meshStandardMaterial color={ACCENT_COLOR} roughness={0.4} metalness={0.2} />
        </mesh>
      ))}
      {parts.throat.map((geometry, i) => (
        <mesh key={`t${i}`} geometry={geometry}>
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.4} />
        </mesh>
      ))}
      {parts.strings.map((geometry, i) => (
        <mesh key={`s${i}`} geometry={geometry}>
          <meshStandardMaterial color={STRING_COLOR} roughness={0.6} />
        </mesh>
      ))}
      {/* cabo */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.062, 0.068, 1.1, 8]} />
        <meshStandardMaterial color={GRIP_COLOR} roughness={0.9} />
      </mesh>
      {/* anel amarelo no fim do cabo */}
      <mesh position={[0, -1.62, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.05, 16]} />
        <meshStandardMaterial color={ACCENT_COLOR} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function Racket3D({ scrollProgress, className }) {
  const [ref, visible] = useInViewport();

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-3, 4, 5]} intensity={2.4} />
        <directionalLight position={[4, -1, -3]} intensity={1.4} color="#d9f24b" />
        <Racket scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
