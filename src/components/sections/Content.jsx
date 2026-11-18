import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content, links } from "../../content/siteContent";
import Highlight from "../ui/Highlight";
import Reveal from "../ui/Reveal";
import { PlayIcon } from "../ui/Icons";
import "./Content.css";

/* ---------------------------------------------------------------
   40 — CONTEÚDO (YouTube)
   O vídeo só carrega quando a pessoa clica no play.
   Isso deixa o site MUITO mais rápido (o YouTube é pesado).
   Animação: o player cresce de 85% para 100% ao entrar na tela.
   --------------------------------------------------------------- */
export default function Content() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <section id="conteudo" className="section section--dark content" data-score="40">
      <span className="ghost-number content__ghost">40</span>

      <div className="container content__grid">
        <div className="content__text">
          <Reveal>
            <span className="label">{content.label}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display content__title">
              <Highlight text={content.title} />
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="content__description">{content.text}</p>
          </Reveal>
          <Reveal delay={0.3} className="content__buttons">
            <a className="btn btn--ball" href={links.youtube} target="_blank" rel="noreferrer">
              {content.youtubeButton}
            </a>
            <a className="btn btn--outline-light" href={links.instagram} target="_blank" rel="noreferrer">
              {content.instagramButton}
            </a>
          </Reveal>
        </div>

        <motion.div ref={ref} className="content__video" style={{ scale }}>
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${content.youtubeVideoId}?autoplay=1&rel=0`}
              title="Vídeo do canal Um Treinador Por Dia"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button className="content__cover" onClick={() => setPlaying(true)} aria-label="Assistir ao vídeo">
              <img src={content.videoCover} alt="" loading="lazy" />
              <span className="content__play">
                <PlayIcon />
              </span>
              <span className="content__badge">{content.videoBadge}</span>
              <span className="content__caption">{content.videoCaption}</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
