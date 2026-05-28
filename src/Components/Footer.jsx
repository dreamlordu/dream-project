// ============================================================
// Footer.jsx
// Uygulamanın alt kısım bileşeni.
// Sol: Logo + telif hakkı  |  Sağ: React Router navigasyon linkleri
// ============================================================

import { Link } from "react-router-dom";

const Footer = () => {
  // ── Navigasyon linkleri (routes ile birebir eşleşmeli) ───
  const navigationLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Rüya Yorumla", path: "/DreamInterpret" },
    { name: "Semboller", path: "/Symbols" },
    { name: "İletişim", path: "/Contact" },
  ];

  return (
    <footer className="w-full bg-neutral text-neutral-content py-6 px-8 font-sans select-none border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Sol: Logo + telif hakkı */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-wider text-white">
            Tabir-i <span className="text-blue-500">Ruya</span>
          </span>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <p className="text-xs text-gray-500 tracking-wide">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Sağ: React Router linkleri (href yok, sayfa yenilenmez) */}
        <nav className="flex items-center gap-6 text-xs font-medium text-gray-400">
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-white transition-colors duration-200"
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
