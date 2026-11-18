import { motion } from "framer-motion";

/**
 * Faz o conteúdo "subir e aparecer" quando entra na tela.
 *
 * Uso:  <Reveal>qualquer coisa</Reveal>
 *       <Reveal delay={0.2} from="left">...</Reveal>
 */
export default function Reveal({ children, delay = 0, from = "bottom", className, as = "div" }) {
  const offsets = {
    bottom: { y: 40, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
