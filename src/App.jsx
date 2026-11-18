/* =====================================================================
   ORDEM DAS SEÇÕES DO SITE
   Para mudar a ordem, troque as linhas de lugar.
   Para esconder uma seção, coloque // na frente da linha.
   O conteúdo (textos, fotos, links) fica em src/content/siteContent.js
   ===================================================================== */

import Navbar from "./components/Navbar";
import Scoreboard from "./components/Scoreboard";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Journey from "./components/sections/Journey";
import Training from "./components/sections/Training";
import Services from "./components/sections/Services";
import Content from "./components/sections/Content";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />       {/* 0  — abertura com a bolinha 3D */}
        <About />      {/* 15 — quem te ensina */}
        <Journey />    {/* 15 — trajetória */}
        <Training />   {/* 30 — treinamento com a raquete 3D */}
        <Services />   {/* 30 — serviços com fotos */}
        <Content />    {/* 40 — vídeo do YouTube */}
        <Contact />    {/* GAME — WhatsApp + formulário */}
      </main>
      <Footer />
      <Scoreboard />
    </>
  );
}
