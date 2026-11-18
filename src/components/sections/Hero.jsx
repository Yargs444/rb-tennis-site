import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "../../content/siteContent";
import Highlight from "../ui/Highlight";
import "./Hero.css";

// A bolinha 3D carrega depois do texto, para o site abrir rápido.
const TennisBall3D = lazy(() => import("../three/TennisBall3D"));

// caminho da linha tracejada (da bolinha até o aviso "Role para sacar")
const TRAJECTORY = "M1010 560 C 900 760, 520 700, 330 720 C 220 732, 150 760, 120 776";

/* ---------------------------------------------------------------
   ABERTURA — "Tênis de verdade..."
   Animações:
   • a bolinha 3D gira, quica e acompanha o scroll
   • a linha tracejada (trajetória) se desenha até o "Role para sacar"
   • se a pessoa não rolar em 3 segundos, o aviso pulsa
   --------------------------------------------------------------- */
export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // conforme rola: a bolinha desce para a esquerda, diminui e some
  const ballX = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const ballY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const ballScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const ballOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);

  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIdle(window.scrollY < 10), 3000);
    const onScroll = () => setIdle(false);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="topo" ref={ref} className="hero" data-score="0">
      {/* linhas da quadra no fundo */}
      <svg className="hero__court" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M260 900 L560 260 L1180 260 L1480 900" />
        <path d="M410 900 L620 260 M1030 900 L1120 260" />
        <path d="M455 640 L1165 640" />
        <path d="M870 260 L870 640" />
      </svg>

      {/* trajetória da bolinha até o aviso de scroll */}
      <svg className="hero__trajectory" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          {/* a "máscara" se desenha aos poucos e vai revelando a linha tracejada */}
          <mask id="trajectory-mask">
            <motion.path
              d={TRAJECTORY}
              stroke="#fff"
              strokeWidth="8"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }}
            />
          </mask>
        </defs>
        <path d={TRAJECTORY} mask="url(#trajectory-mask)" />
      </svg>

      <motion.div
        className="hero__ball"
        style={{ x: ballX, y: ballY, scale: ballScale, opacity: ballOpacity }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero__ball-glow" />
        <Suspense fallback={<div className="hero__ball-fallback" />}>
          <TennisBall3D scrollProgress={scrollYProgress} className="hero__ball-canvas" />
        </Suspense>
      </motion.div>

      <motion.div className="hero__content container" style={{ y: textY }}>
        <motion.span
          className="label hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {hero.eyebrow}
        </motion.span>
        <motion.h1
          className="display hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Highlight text={hero.title} />
        </motion.h1>
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {hero.subtitle}
        </motion.p>
      </motion.div>

      <a href="#sobre" className={`hero__cue ${idle ? "hero__cue--pulse" : ""}`}>
        <span className="hero__mouse" aria-hidden="true">
          <span className="hero__mouse-dot" />
        </span>
        <span className="hero__cue-text">
          <strong>{hero.scrollCue} ↓</strong>
          <span>{hero.scrollHint}</span>
        </span>
      </a>
    </section>
  );
}
