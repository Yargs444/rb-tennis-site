# RB Tennis — Landing page

Site do professor de tênis **Renato Bulgarelli** (RB Serviços Esportivos), feito em **React**.
Ele tem animações de scroll, uma bolinha e uma raquete em **3D** e um formulário que envia a mensagem pronta para o **WhatsApp**.

---

## 1. Como rodar o site no seu computador

Você precisa ter o **Node.js** instalado (versão 20 ou mais nova): https://nodejs.org

Abra a pasta do projeto no **VS Code**, abra o terminal (`Ctrl + '`) e rode:

```bash
npm install      # só na primeira vez: baixa as bibliotecas
npm run dev      # liga o site em modo de edição
```

Depois abra o endereço que aparecer no terminal (geralmente **http://localhost:5173**).
Com o `npm run dev` ligado, **toda vez que você salva um arquivo o site atualiza sozinho**.

---

## 2. Onde mudar cada coisa (o mais importante)

| Quero mudar...                               | Arquivo                               |
| -------------------------------------------- | ------------------------------------- |
| Textos, links, números, serviços, trajetória | `src/content/siteContent.js`          |
| Fotos                                        | pasta `public/images/` + `siteContent.js` |
| Cores e fontes                               | `src/styles/theme.css`                |
| Ordem das seções / esconder uma seção        | `src/App.jsx`                         |
| Título e descrição do Google/WhatsApp (SEO)  | `index.html`                          |
| Ícone da aba do navegador                    | `public/favicon.svg`                  |

> **Regra de ouro:** 90% das mudanças são feitas só no `src/content/siteContent.js`.
> Você não precisa mexer nos componentes para trocar textos ou links.

### Textos
Abra `src/content/siteContent.js` e mude o que está **entre aspas**.
Para deixar uma parte do título **em destaque** (itálico e colorido), coloque entre asteriscos:

```js
title: "Tênis de *verdade*, dentro e fora das quadras.",
```

### Links
Estão todos juntos no começo do `siteContent.js`, no bloco `links`:

```js
export const links = {
  whatsappNumber: "",  // ← colocar o número aqui
  whatsappFallback: "https://wa.me/message/WE5OFE264ZYKK1",
  youtube: "...",
  instagram: "...",
  tiktok: "...",
  linkedin: "...",
};
```

### WhatsApp (importante!)
O formulário monta a mensagem e abre o WhatsApp com o texto pronto.
Para isso funcionar **com a mensagem preenchida**, coloque o número em `whatsappNumber`, **só com números**:

```
55 + DDD + número   →   "5516999998888"
```

Enquanto estiver vazio, os botões usam o link antigo (`whatsappFallback`), que abre a conversa **sem** o texto pronto.

### Fotos
1. Coloque a foto nova em `public/images/` (de preferência em **.webp** e com até ~1400px de largura, para o site ficar rápido).
2. No `siteContent.js`, troque o caminho: `photo: "/images/nome-da-foto.webp"`.
3. Sempre preencha o `photoAlt` (descrição da foto, ajuda no Google e na acessibilidade).

Dica: para converter fotos para .webp, use o site https://squoosh.app

### Serviços
Cada serviço é um bloco dentro de `services.items`. Para **adicionar** um serviço, copie um bloco inteiro (das chaves `{` até `},`) e mude os textos.
Ele aparece **automaticamente** nos quadros, no formulário (botões de escolha) e no rodapé.

### Vídeo do YouTube
Em `content.youtubeVideoId`, coloque o ID do vídeo — a parte depois de `watch?v=` no link.
Exemplo: `youtube.com/watch?v=kYx_vhhCfc4` → `"kYx_vhhCfc4"`.

### Cores
Em `src/styles/theme.css`. Exemplo: para mudar o amarelo da bolinha em todo o site, troque só `--color-ball`.
(As cores dos objetos 3D ficam no topo dos arquivos em `src/components/three/`.)

---

## 3. Estrutura das pastas

```
rb-tennis-site/
├── index.html                 ← título do site, descrição (SEO)
├── public/
│   ├── favicon.svg            ← ícone da aba
│   └── images/                ← fotos
└── src/
    ├── content/
    │   └── siteContent.js     ← ★ TODO O CONTEÚDO DO SITE
    ├── styles/
    │   ├── theme.css          ← ★ cores, fontes e espaçamentos
    │   └── global.css         ← estilos que valem para o site todo
    ├── components/
    │   ├── Navbar.jsx         ← menu do topo
    │   ├── Scoreboard.jsx     ← placar fixo 0·15·30·40·GAME
    │   ├── sections/          ← uma seção por arquivo (+ o .css dela)
    │   │   ├── Hero.jsx       ← abertura com a bolinha 3D
    │   │   ├── About.jsx      ← 15 · Quem te ensina
    │   │   ├── Journey.jsx    ← 15 · Trajetória
    │   │   ├── Training.jsx   ← 30 · Treinamento (raquete 3D)
    │   │   ├── Services.jsx   ← 30 · Serviços
    │   │   ├── Content.jsx    ← 40 · Vídeo do YouTube
    │   │   ├── Contact.jsx    ← GAME · WhatsApp + formulário
    │   │   └── Footer.jsx     ← rodapé
    │   ├── three/             ← objetos 3D (bolinha e raquete)
    │   └── ui/                ← peças reutilizáveis (animações, ícones)
    ├── hooks/                 ← funções auxiliares do React
    ├── utils/whatsapp.js      ← monta o link do WhatsApp
    ├── App.jsx                ← ★ ordem das seções
    └── main.jsx               ← ponto de partida (fontes e estilos)
```

---

## 4. Como funcionam as animações

- **Placar fixo:** cada seção tem `data-score="15"` (por exemplo). O placar acende o ponto da seção que está no meio da tela.
- **Animações de entrada:** o componente `<Reveal>` faz qualquer coisa "subir e aparecer" quando entra na tela.
- **3D:** a bolinha e a raquete são feitas em código com **three.js** (sem imagens). Elas só carregam **depois** que a página abre e ficam **pausadas** quando saem da tela, para não pesar no celular.
- **Acessibilidade:** quem ativou "reduzir movimento" no celular ou no computador vê o site sem as animações.

Bibliotecas usadas: `react`, `framer-motion` (animações), `three` + `@react-three/fiber` (3D), `@fontsource` (fontes).

---

## 5. Como publicar o site (colocar no ar)

```bash
npm run build
```

Isso cria a pasta **`dist/`** com o site pronto. Depois, use um destes serviços (todos têm plano grátis):

- **Vercel** (https://vercel.com) ou **Netlify** (https://netlify.com): conecte o repositório do GitHub e, a cada mudança enviada, o site atualiza sozinho.
  - Comando de build: `npm run build` · Pasta de saída: `dist`
- **Netlify Drop** (https://app.netlify.com/drop): arraste a pasta `dist/` para o navegador.

Para usar o domínio `renatobulgarellitennis.com`, configure o domínio no painel da Vercel/Netlify.

Para conferir o site final antes de publicar: `npm run build` e depois `npm run preview`.

---

## 6. Usar este site para outro cliente (revenda)

1. Duplique a pasta do projeto.
2. Troque **todo** o conteúdo em `src/content/siteContent.js`.
3. Troque as fotos em `public/images/`.
4. Ajuste as cores em `src/styles/theme.css`.
5. Mude o título e a descrição em `index.html`.
6. Se não fizer sentido o tema de tênis, comente as seções no `App.jsx` ou troque os objetos 3D.

---

## 7. Pendências (antes de publicar)

- [ ] Colocar o número do WhatsApp do Renato em `links.whatsappNumber`
- [ ] Conferir todos os links do bloco `links` (YouTube, Instagram, TikTok, LinkedIn)
- [ ] Conferir o ID do vídeo do YouTube em `content.youtubeVideoId`
- [ ] Revisar os números da seção "Quem te ensina" (alunos, clubes, alcance)
