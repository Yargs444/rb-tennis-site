import { footer, links, services, site, contact } from "../../content/siteContent";
import { whatsappLink } from "../../utils/whatsapp";
import "./Footer.css";

/** Rodapé com atalhos para serviços, contato e redes. */
export default function Footer() {
  const columns = [
    {
      title: "Serviços",
      items: services.items.map((item) => ({ label: item.title, href: "#servicos" })),
    },
    {
      title: "Contato",
      items: [
        { label: "WhatsApp", href: whatsappLink(contact.defaultMessage), external: true },
        { label: "Instagram", href: links.instagram, external: true },
        { label: "LinkedIn", href: links.linkedin, external: true },
      ],
    },
    {
      title: "Conteúdo",
      items: [
        { label: "YouTube · Um Treinador Por Dia", href: links.youtube, external: true },
        { label: "TikTok", href: links.tiktok, external: true },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__columns">
          <div className="footer__brand">
            <a href="#topo" className="footer__logo">
              {site.brandFirst}{" "}
              <span>{site.brandSecond}</span>
            </a>
            <p>{footer.description}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} className="footer__column" aria-label={column.title}>
              <span className="footer__title">{column.title}</span>
              {column.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <span>
            © {site.year} {site.companyName} · {site.city}
          </span>
          <span className="footer__signature">{footer.signature}</span>
        </div>
      </div>
    </footer>
  );
}
