import { lazy, Suspense, useRef } from "react";
import { useScroll } from "framer-motion";
import { training } from "../../content/siteContent";
import Highlight from "../ui/Highlight";
import Reveal from "../ui/Reveal";
import "./Training.css";

const Racket3D = lazy(() => import("../three/Racket3D"));

/* ---------------------------------------------------------------
   30 — TREINAMENTO
   Animações: a raquete 3D gira com o scroll (como um forehand) e
   as linhas 01–03 entram da esquerda, uma de cada vez.
   --------------------------------------------------------------- */
export default function Training() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="treinamento" ref={ref} className="section section--dark training" data-score="30">
      <span className="ghost-number training__ghost">30</span>

      <Suspense fallback={null}>
        <Racket3D scrollProgress={scrollYProgress} className="training__racket" />
      </Suspense>

      <div className="container training__inner">
        <Reveal>
          <span className="label">{training.label}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display training__title">
            <Highlight text={training.title} />
          </h2>
        </Reveal>

        <ul className="training__list">
          {training.items.map((item, i) => (
            <Reveal as="li" key={item.title} from="left" delay={i * 0.15} className="training__row">
              <span className="training__number">{String(i + 1).padStart(2, "0")}</span>
              <div className="training__info">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              {item.soon ? (
                <span className="training__soon">Em breve</span>
              ) : (
                <a className="training__link" href={`#${item.target}`}>
                  {item.linkLabel} →
                </a>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
