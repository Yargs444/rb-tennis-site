import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about, links } from "../../content/siteContent";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import { LinkedInIcon } from "../ui/Icons";
import "./About.css";

/* ---------------------------------------------------------------
   15 — QUEM TE ENSINA
   Animações: frase aparece palavra por palavra, números contam,
   foto com leve parallax.
   --------------------------------------------------------------- */

/** Frase que aparece uma palavra de cada vez. Palavras entre *asteriscos* ficam em destaque. */
function WordByWord({ text }) {
  const words = [];
  let highlighted = false;
  text.split(" ").forEach((word) => {
    const starts = word.startsWith("*");
    const ends = word.endsWith("*") || word.endsWith("*.") || word.endsWith("*,");
    if (starts) highlighted = true;
    words.push({ text: word.replace(/\*/g, ""), highlighted });
    if (ends) highlighted = false;
  });

  return (
    <motion.p
      className="display about__quote"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.05 }}
    >
      <span aria-hidden="true">“</span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={word.highlighted ? "about__quote-em" : undefined}
          variants={{ hidden: { opacity: 0.12, y: 8 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.4 }}
        >
          {word.text}{" "}
        </motion.span>
      ))}
      <span aria-hidden="true">”</span>
    </motion.p>
  );
}

export default function About() {
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="sobre" className="section section--light about" data-score="15">
      <span className="ghost-number about__ghost">15</span>

      <div className="container about__grid">
        <Reveal className="about__photo" from="left">
          <div ref={photoRef} className="about__photo-frame">
            <motion.img
              src={about.photo}
              alt={about.photoAlt}
              style={{ y: photoY }}
              loading="lazy"
              width="440"
              height="560"
            />
            <div className="about__photo-caption">
              <span className="display about__name">
                {about.name} <em>{about.surname}</em>
              </span>
              <span className="about__role">{about.role}</span>
            </div>
          </div>
        </Reveal>

        <div className="about__bio">
          <Reveal>
            <span className="label">{about.label}</span>
          </Reveal>
          <WordByWord text={about.quote} />
          <Reveal>
            <p className="about__text">{about.text}</p>
          </Reveal>

          <div className="about__stats">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="about__stat">
                <span className="about__stat-value">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="about__stat-label">{stat.label}</span>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a className="btn btn--outline-dark about__linkedin" href={links.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> {about.linkedinLabel} ↗
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
