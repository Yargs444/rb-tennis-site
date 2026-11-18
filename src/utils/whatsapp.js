import { links } from "../content/siteContent";

/**
 * Monta o link do WhatsApp com uma mensagem pronta.
 *
 * Se o número do Renato estiver preenchido em siteContent.js,
 * o link abre a conversa já com o texto escrito.
 * Se ainda não tiver número, usa o link antigo (sem texto).
 */
export function whatsappLink(message = "") {
  const number = (links.whatsappNumber || "").replace(/\D/g, ""); // deixa só os números

  if (!number) {
    return links.whatsappFallback;
  }

  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

/** Junta os dados do formulário numa mensagem bonita para o WhatsApp. */
export function buildFormMessage({ name, service, message }) {
  const lines = [`Olá, Renato! Me chamo ${name.trim()}.`];
  if (service) lines.push(`Tenho interesse em: ${service}.`);
  lines.push("", message.trim(), "", "(Mensagem enviada pelo site)");
  return lines.join("\n");
}
