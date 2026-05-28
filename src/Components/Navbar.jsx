import CardNav from "./CardNav"; // Aynı klasörde oldukları için
import dreamlogo from "../assets/image/dream-catcher.png";

const Navbar = () => {
  const menuItems = [
    {
      label: "Rüya Yorumla",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Yorumlama", href: "/DreamInterpret" },
        { label: "Semboller", href: "/Symbols" },
      ],
    },
    {
      label: "Genel",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Anasayfa", href: "/" },
        { label: "İletişim", href: "/Contact" },
      ],
    },
    {
      label: "Sosyal",
      bgColor: "#5227FF",
      textColor: "#fff",
      links: [
        { label: "GitHub", href: "https://github.com/dreamlordu" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/osman-gözütok-63a5b8326/",
        },
      ],
    },
  ];

  return (
    <CardNav
      logo={dreamlogo}
      siteName="Tabir-i "
      sitename="Ruya"
      items={menuItems}
      baseColor="#ffffff"
      menuColor="#000000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default Navbar;
