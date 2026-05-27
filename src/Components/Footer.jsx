import { Link } from "react-router-dom"; // Link bileşenini import ettik

const Footer = () => {
  // Tanımladığın routelar ile birebir eşleşen bir dizi oluşturduk
  const navigationLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Rüya Yorumla", path: "/DreamInterpret" },
    { name: "Semboller", path: "/Symbols" }, // Eğer menüde göstermek istersen
    { name: "İletişim", path: "/Contact" },
  ];

  return (
    <footer className="w-full bg-neutral text-neutral-content py-6 px-8 font-sans select-none border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Sol Kısım: Logo ve Telif Hakkı */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-wider text-white">
            Oneiromancy <span className="text-blue-500">AI</span>
          </span>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <p className="text-xs text-gray-500 tracking-wide">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Sağ Kısım: React Router Uyumlu Minimal Linkler */}
        <nav className="flex items-center gap-6 text-xs font-medium text-gray-400">
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path} // href yerini 'to' aldı, sayfa yenilenmeyecek
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
