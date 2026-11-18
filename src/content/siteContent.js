/* =====================================================================
   CONTEÚDO DO SITE — RB TENNIS
   =====================================================================
   Este é o ÚNICO arquivo que você precisa abrir para mudar:
     • textos de todas as seções
     • links (WhatsApp, Instagram, YouTube...)
     • fotos
     • serviços, números, trajetória

   Regras simples:
     1. Mude só o que está ENTRE ASPAS "assim".
     2. Não apague as vírgulas no fim das linhas.
     3. Para trocar uma foto: coloque o arquivo novo na pasta
        public/images/ e troque o nome aqui (ex.: "/images/minha-foto.webp").
     4. Salvou o arquivo? O site atualiza sozinho (com "npm run dev" rodando).

   Para usar o site com outro cliente, basta trocar o conteúdo deste
   arquivo + as cores em src/styles/theme.css.
   ===================================================================== */

// ---------------------------------------------------------------------
// 1. LINKS — tudo que é clicável fica aqui, em um lugar só
// ---------------------------------------------------------------------
export const links = {
  // Número do WhatsApp SÓ COM NÚMEROS: 55 + DDD + número.
  // Exemplo: "5516999998888". Enquanto estiver vazio, os botões usam
  // o link "whatsappFallback" abaixo (sem mensagem pronta).
  whatsappNumber: "", // TODO: colocar o número do Renato

  // Link atual do WhatsApp (usado enquanto whatsappNumber estiver vazio)
  whatsappFallback: "https://wa.me/message/WE5OFE264ZYKK1",

  youtube: "https://www.youtube.com/@renato.bulgarelli",
  instagram: "https://www.instagram.com/renato.bulgarelli/",
  tiktok: "https://www.tiktok.com/@renato.bulgarelli",
  linkedin: "https://www.linkedin.com/in/renatobulgarellidamota",
};

// ---------------------------------------------------------------------
// 2. INFORMAÇÕES GERAIS
// ---------------------------------------------------------------------
export const site = {
  brandFirst: "RB", // primeira parte do logo (cor clara)
  brandSecond: "Tennis", // segunda parte do logo (cor de destaque)
  companyName: "RB Serviços Esportivos",
  city: "Ribeirão Preto/SP",
  year: 2026,
};

// ---------------------------------------------------------------------
// 3. MENU (o "id" é o nome da seção para onde o link leva)
// ---------------------------------------------------------------------
export const menu = [
  { label: "Treinamento", id: "treinamento" },
  { label: "Sobre", id: "sobre" },
  { label: "Conteúdo", id: "conteudo" },
  { label: "Contatos", id: "contato" },
];
export const menuButton = { label: "Agendar aula", id: "contato" };

// ---------------------------------------------------------------------
// 4. ABERTURA (primeira tela)
// ---------------------------------------------------------------------
export const hero = {
  eyebrow: "Treinamento + Conteúdo · Ribeirão Preto/SP",
  // Use *asteriscos* para a palavra que fica em destaque (amarela e itálica)
  title: "Tênis de *verdade*, dentro e fora das quadras.",
  subtitle:
    "Treinamento técnico e biomecânica com Renato Bulgarelli — do primeiro golpe à competição.",
  scrollCue: "Role para sacar",
  scrollHint: "Cada scroll é um ponto. Chegue ao game.",
};

// ---------------------------------------------------------------------
// 5. QUEM TE ENSINA (Sobre)
// ---------------------------------------------------------------------
export const about = {
  label: "15 — Quem te ensina",
  photo: "/images/renato-forehand.webp",
  photoAlt: "Renato Bulgarelli executando um forehand em quadra",
  name: "Renato",
  surname: "Bulgarelli",
  role: "Treinador de tênis · RB Serviços Esportivos",
  quote:
    "Todo conhecimento que não é compartilhado é perdido. Por isso estou *em quadra e nas telas.*",
  text:
    "Graduado em Educação Física pela Unaerp, certificado pela CBT e pela FPT e pós-graduando em Treinamento Esportivo na Infância e Adolescência. Técnica e biomecânica são a base: entender o movimento é o que separa um jogo repetitivo de um jogo eficiente.",
  // Os números contam do zero até "value" quando aparecem na tela
  stats: [
    { value: 5, suffix: "", label: "anos em quadra" },
    { value: 100, suffix: "+", label: "alunos formados" },
    { value: 14, suffix: "", label: "clubes em 2026" },
    { value: 100, suffix: "k", label: "pessoas por mês" },
  ],
  linkedinLabel: "Ver no LinkedIn",
};

// ---------------------------------------------------------------------
// 6. TRAJETÓRIA (continuação do Sobre)
// ---------------------------------------------------------------------
export const journey = {
  label: "Trajetória",
  title: "Tênis levado a sério, *do primeiro golpe ao jogo completo.*",
  text:
    "Treinador em Ribeirão Preto, trabalho com crianças, adolescentes, universitários e adultos — quem quer aprender, evoluir no esporte ou simplesmente descobrir o prazer de estar numa quadra.",
  photo: "/images/renato-saque.webp",
  photoAlt: "Renato Bulgarelli sacando em uma quadra rápida",
  steps: [
    {
      tag: "01 · Formação",
      title: "Unaerp",
      text: "Formado em Educação Física, voltou à universidade já como treinador, levando o tênis recreativo a novos alunos.",
    },
    {
      tag: "02 · Método",
      title: "Play and Stay (ITF)",
      text: "A abordagem da Federação Internacional de Tênis que coloca o jogo no centro do aprendizado desde a primeira aula.",
    },
    {
      tag: "03 · Competição",
      title: "CFTRP",
      text: "No corpo técnico do Centro de Formação e Treinamento de Tênis de Ribeirão Preto, focado em atletas competitivos.",
    },
    {
      tag: "04 · Universitário",
      title: "LAURP · USP",
      text: "Treina a atlética da USP de Ribeirão Preto no universo universitário competitivo.",
    },
  ],
  closing:
    "Se você chegou até aqui, provavelmente está pensando em *começar ou continuar* sua jornada no tênis.",
  closingButton: "Conversar no WhatsApp",
};

// ---------------------------------------------------------------------
// 7. TREINAMENTO (visão geral, com a raquete 3D)
// ---------------------------------------------------------------------
export const training = {
  label: "30 — Treinamento",
  title: "Do primeiro golpe *à competição.*",
  // "target" = id da seção para onde o link leva. "soon: true" mostra "Em breve".
  items: [
    {
      title: "Aulas técnicas",
      text: "Crianças, atléticas universitárias e adultos — com foco em biomecânica.",
      linkLabel: "Ver pacotes",
      target: "servicos",
    },
    {
      title: "Conteúdo",
      text: "Um Treinador Por Dia no YouTube, com bastidores e análises técnicas.",
      linkLabel: "Assistir",
      target: "conteudo",
    },
    {
      title: "Loja",
      text: "Planilhas de treino, guias técnicos e cursos em vídeo.",
      soon: true,
    },
  ],
};

// ---------------------------------------------------------------------
// 8. SERVIÇOS (os 4 quadros com foto)
//    "short" é o nome curto que aparece nos botões do formulário.
// ---------------------------------------------------------------------
export const services = {
  label: "30 — Serviços",
  title: "Um treino para *cada jogo.*",
  intro:
    "Aprender jogando, como propõe o método Play and Stay da Federação Internacional de Tênis. Horários e valores pelo WhatsApp.",
  buttonLabel: "Consultar horários no WhatsApp",
  items: [
    {
      title: "Crianças e adolescentes",
      short: "Crianças",
      text: "Aprendizagem a partir do jogo, seguindo o método Play and Stay da Federação Internacional de Tênis.",
      photo: "/images/aula-criancas.webp",
      photoAlt: "Renato dando aula para um aluno adolescente",
    },
    {
      title: "Atléticas de faculdade",
      short: "Atléticas",
      text: "Desenvolvimento e aprimoramento tático de jogadores e jogadoras para os jogos universitários.",
      photo: "/images/aula-atleticas.webp",
      photoAlt: "Treino com atleta universitária em quadra rápida",
    },
    {
      title: "Treinamento específico",
      short: "Treino específico",
      text: "Aprimoramento técnico de um único golpe, com análise detalhada. Pacote mínimo de 6 aulas.",
      photo: "/images/aula-especifico.webp",
      photoAlt: "Renato corrigindo a empunhadura de uma aluna",
    },
    {
      title: "Adultos iniciantes",
      short: "Adultos",
      text: "Do zero à primeira partida: aprender a partir do jogo, como propõe o Play and Stay.",
      photo: "/images/aula-adultos.webp",
      photoAlt: "Aula para aluna adulta em quadra de saibro",
    },
  ],
};

// ---------------------------------------------------------------------
// 9. CONTEÚDO (vídeo do YouTube)
// ---------------------------------------------------------------------
export const content = {
  label: "40 — Conteúdo",
  title: "Um treinador *por dia.*",
  text:
    "Mais de 150 vídeos com análises técnicas, bastidores e a visão de quem vive o tênis competitivo todos os dias.",
  // ID do vídeo = a parte depois de "watch?v=" no link do YouTube
  youtubeVideoId: "kYx_vhhCfc4",
  videoCover: "/images/video-capa.webp",
  videoBadge: "500+ inscritos",
  videoCaption: "Ative o som · último vídeo",
  youtubeButton: "Assistir no YouTube",
  instagramButton: "@renato.bulgarelli",
};

// ---------------------------------------------------------------------
// 10. CONTATO (seção amarela + formulário que envia para o WhatsApp)
// ---------------------------------------------------------------------
export const contact = {
  eyebrow: "Game, set & match",
  title: "Sua vez de *sacar.*",
  text: "Aulas em Ribeirão Preto/SP para crianças, universitários e adultos. Agende uma aula experimental.",
  button: "Agendar pelo WhatsApp",
  // Mensagem usada pelos botões simples de WhatsApp (fora do formulário)
  defaultMessage: "Olá, Renato! Vim pelo site e quero saber mais sobre as aulas.",

  form: {
    title: "Prefere adiantar a conversa?",
    subtitle: "Preencha e a mensagem chega pronta no WhatsApp do Renato.",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    serviceLabel: "Qual serviço?",
    messageLabel: "Mensagem",
    messagePlaceholder: "Conte seu nível, sua idade e o que quer melhorar no jogo.",
    submit: "Enviar pelo WhatsApp",
    note: "Abre o WhatsApp com a mensagem pronta — é só apertar enviar.",
    errorName: "Escreva seu nome.",
    errorMessage: "Escreva uma mensagem curta.",
  },
};

// ---------------------------------------------------------------------
// 11. RODAPÉ
// ---------------------------------------------------------------------
export const footer = {
  description: "Treinamento técnico e conteúdo sobre tênis em Ribeirão Preto/SP, por Renato Bulgarelli.",
  signature: "Game, set & match",
};
