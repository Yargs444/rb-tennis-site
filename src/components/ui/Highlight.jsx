/**
 * Transforma "Texto com *destaque*" em: Texto com <em>destaque</em>
 * Assim, no siteContent.js, basta colocar asteriscos em volta da
 * parte que deve ficar em itálico e com a cor de destaque.
 */
export default function Highlight({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, index) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}
