import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Scoreboard.css";

/* ---------------------------------------------------------------
   PLACAR FIXO  0 · 15 · 30 · 40 · GAME
   Cada seção do site tem um atributo data-score="15" (por exemplo).
   O placar acende o ponto da seção que está no meio da tela.
   --------------------------------------------------------------- */

const POINTS = ["0", "15", "30", "40", "GAME"];

export default function Scoreboard() {
  const [active, setActive] = useState("0");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-score]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.score);
        });
      },
      // considera "ativa" a seção que cruza a linha do meio da tela
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scoreboard" role="status" aria-label={`Placar: ${active}`}>
      {POINTS.map((point) => (
        <span key={point} className={`scoreboard__point ${point === active ? "is-active" : ""}`}>
          <AnimatePresence>
            {point === active && (
              <motion.span
                layoutId="score-pill"
                className="scoreboard__pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
          </AnimatePresence>
          <span className="scoreboard__text">{point}</span>
        </span>
      ))}
    </div>
  );
}
