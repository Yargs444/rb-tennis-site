import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";

// Fontes instaladas junto com o site (não dependem do Google Fonts)
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

// Estilos gerais primeiro; os estilos de cada seção vêm depois (dentro do App)
import "./styles/theme.css";
import "./styles/global.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* reducedMotion="user": respeita quem desativou animações no celular/computador */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
);
