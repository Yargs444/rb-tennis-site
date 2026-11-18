import { useEffect, useRef, useState } from "react";

/**
 * Diz se um elemento está aparecendo na tela.
 * Usado para "pausar" os objetos 3D quando a pessoa rola para longe,
 * o que economiza processamento e bateria do celular.
 */
export default function useInViewport(margin = "200px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: margin,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, visible];
}
