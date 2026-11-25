import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Menu, X } from "lucide-react";

const links = [
  ["sobre", "Sobre"],
  ["trajetoria", "Trajetória"],
  ["projetos", "Projetos"],
  ["stack", "Stack"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-10% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    const escape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className="floating-header">
      <a
        className="brand"
        href="#inicio"
        aria-label="Matheus, início"
        onClick={() => setOpen(false)}
      >
        <Code2 size={21} />
        <span>
          matheus<span className="blue">.</span>dev
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([id, label]) => (
          <a
            key={id}
            className={active === id ? "active" : ""}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-contact" href="#contato">
        Vamos conversar <ArrowUpRight size={15} />
      </a>
      <button
        className="menu-toggle"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Navegação móvel"
        >
          {[...links, ["contato", "Contato"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={17} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
