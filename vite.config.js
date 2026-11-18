import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração do Vite (a ferramenta que roda e gera o site).
// Normalmente você não precisa mexer aqui.
export default defineConfig({
  plugins: [react()],
  build: {
    // a parte 3D (three.js) é grande, mas só carrega depois que a página abre
    chunkSizeWarningLimit: 1200,
  },
});
