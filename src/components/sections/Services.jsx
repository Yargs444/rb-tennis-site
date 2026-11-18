import { motion } from "framer-motion";
import { services } from "../../content/siteContent";
import { whatsappLink } from "../../utils/whatsapp";
import Highlight from "../ui/Highlight";
import Reveal from "../ui/Reveal";
import "./Services.css";

/* ---------------------------------------------------------------
   30 — SERVIÇOS (4 quadros com foto)
   Animação: as fotos começam com zoom e "assentam" ao entrar na
   tela; os quadros aparecem em zigue-zague, como uma troca de bola.
   Para adicionar um serviço novo, basta incluir mais um item em
   "services.items" no arquivo siteContent.js.
   --------------------------------------------------------------- */
export default function Services() {
  return (
    <section id="servicos" className="section section--light services" data-score="30">
      <div className="container">
        <div className="services__header">
          <div>
            <Reveal>
              <span className="label">{services.label}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display services__title">
                <Highlight text={services.title} />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="services__intro">{services.intro}</p>
          </Reveal>
        </div>

        <div className="services__grid">
          {services.items.map((item, i) => (
            <Reveal key={item.title} from={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 0.15} className="services__card">
              <div className="services__photo">
                <motion.img
                  src={item.photo}
                  alt={item.photoAlt}
                  loading="lazy"
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="services__body">
                <span className="services__number">{String(i + 1).padStart(2, "0")}</span>
                <div className="services__info">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a
                    href={whatsappLink(`Olá, Renato! Vim pelo site e quero saber horários e valores de: ${item.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {services.buttonLabel} →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
