import { useEffect, useState } from "react";
import { menu, menuButton, site } from "../content/siteContent";
import { MenuIcon } from "./ui/Icons";
import "./Navbar.css";

/** Menu do topo. Fica fixo e ganha fundo quando a pessoa rola a página. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${open ? "navbar--open" : ""}`}>
      <div className="navbar__inner container">
        <a href="#topo" className="navbar__logo" onClick={close}>
          {site.brandFirst}{" "}
          <span>{site.brandSecond}</span>
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>

        <nav className="navbar__links" aria-label="Menu principal">
          {menu.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={close}>
              {item.label}
            </a>
          ))}
          <a href={`#${menuButton.id}`} className="btn btn--ball navbar__cta" onClick={close}>
            {menuButton.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
