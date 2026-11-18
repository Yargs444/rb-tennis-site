import { useState } from "react";
import { motion } from "framer-motion";
import { contact, services } from "../../content/siteContent";
import { buildFormMessage, whatsappLink } from "../../utils/whatsapp";
import Highlight from "../ui/Highlight";
import Reveal from "../ui/Reveal";
import { WhatsAppIcon } from "../ui/Icons";
import "./Contact.css";

/* ---------------------------------------------------------------
   GAME — CONTATO
   O formulário NÃO precisa de servidor: ao clicar em enviar,
   ele monta a mensagem e abre o WhatsApp do Renato com o texto
   pronto. A pessoa só aperta "enviar" no WhatsApp.
   As opções de serviço vêm automaticamente da lista de serviços.
   --------------------------------------------------------------- */
export default function Contact() {
  const { form } = contact;
  const [name, setName] = useState("");
  const [service, setService] = useState(services.items[0]?.short || "");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    // confere se os campos obrigatórios foram preenchidos
    const newErrors = {};
    if (!name.trim()) newErrors.name = form.errorName;
    if (!message.trim()) newErrors.message = form.errorMessage;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const text = buildFormMessage({ name, service, message });
    window.open(whatsappLink(text), "_blank", "noopener");
  }

  return (
    <section id="contato" className="section contact" data-score="GAME">
      <div className="container contact__grid">
        <div className="contact__left">
          <Reveal>
            <span className="contact__eyebrow">{contact.eyebrow}</span>
          </Reveal>
          <motion.h2
            className="display contact__title"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Highlight text={contact.title} />
          </motion.h2>
          <Reveal delay={0.15}>
            <p className="contact__text">{contact.text}</p>
          </Reveal>
          <motion.a
            className="btn btn--court contact__button"
            href={whatsappLink(contact.defaultMessage)}
            target="_blank"
            rel="noreferrer"
            initial={{ y: 0 }}
            whileInView={{ y: [0, -14, 0, -6, 0] }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <WhatsAppIcon size={20} /> {contact.button} →
          </motion.a>
        </div>

        <Reveal from="right" className="contact__form-wrap">
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__form-head">
              <h3>{form.title}</h3>
              <p>{form.subtitle}</p>
            </div>

            <label className="contact__field">
              <span className="contact__field-label">{form.nameLabel} *</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={form.namePlaceholder}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </label>

            <fieldset className="contact__field">
              <legend className="contact__field-label">{form.serviceLabel}</legend>
              <div className="contact__chips">
                {services.items.map((item) => (
                  <button
                    type="button"
                    key={item.short}
                    className={`contact__chip ${service === item.short ? "is-selected" : ""}`}
                    onClick={() => setService(item.short)}
                    aria-pressed={service === item.short}
                  >
                    {service === item.short && "✓ "}
                    {item.short}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="contact__field">
              <span className="contact__field-label">{form.messageLabel} *</span>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={form.messagePlaceholder}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <span className="contact__error">{errors.message}</span>}
            </label>

            <button type="submit" className="btn btn--ball contact__submit">
              <WhatsAppIcon size={20} /> {form.submit}
            </button>
            <p className="contact__note">{form.note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
