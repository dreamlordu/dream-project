import { Link } from "react-router-dom";

const Footer = () => {
  const navigationLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Rüya Yorumla", path: "/DreamInterpret" },
    { name: "Semboller", path: "/Symbols" },
    { name: "İletişim", path: "/Contact" },
  ];

  return (
    <footer
      className="w-full py-6 px-8 font-sans select-none border-t"
      style={{
        backgroundColor: "#171717",
        borderColor: "#262626",
        color: "#a3a3a3",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-lg font-bold tracking-wider"
            style={{ color: "#ffffff" }}
          >
            Tabir-i <span style={{ color: "#3b82f6" }}>Ruya</span>
          </span>
          <span className="hidden sm:inline" style={{ color: "#404040" }}>
            |
          </span>
          <p className="text-xs" style={{ color: "#737373" }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-xs font-medium">
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{ color: "#737373" }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#737373")}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
