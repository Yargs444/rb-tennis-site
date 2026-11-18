import { motion } from "framer-motion";
import { journey, contact } from "../../content/siteContent";
import { whatsappLink } from "../../utils/whatsapp";
import Highlight from "../ui/Highlight";
import Reveal from "../ui/Reveal";
import "./Journey.css";

/* ---------------------------------------------------------------
   TRAJETÓRIA (continuação do Sobre)
   Animação: a linha em cima de cada etapa se desenha da esquerda
   para a direita, uma depois da outra (01 → 04).
   --------------------------------------------------------------- */
export default function Journey() {
  return (
    <section className="section section--light journey" data-score="15">
      <div className="container">
        <div className="journey__intro">
          <div className="journey__intro-text">
            <Reveal>
              <span className="label">{journey.label}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display journey__title">
                <Highlight text={journey.title} />
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="journey__text">{journey.text}</p>
            </Reveal>
          </div>
          <Reveal className="journey__photo" from="right">
            <img src={journey.photo} alt={journey.photoAlt} loading="lazy" width="672" height="460" />
          </Reveal>
        </div>

        <ol className="journey__steps">
          {journey.steps.map((step, i) => (
            <li key={step.title} className="journey__step">
              <motion.span
                className="journey__line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
              <Reveal delay={0.2 + i * 0.25}>
                <span className="journey__tag">{step.tag}</span>
                <h3 className="journey__step-title">{step.title}</h3>
                <p className="journey__step-text">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="journey__closing">
          <p className="display journey__closing-text">
            <Highlight text={journey.closing} />
          </p>
          <a className="btn btn--ball" href={whatsappLink(contact.defaultMessage)} target="_blank" rel="noreferrer">
            {journey.closingButton} →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
