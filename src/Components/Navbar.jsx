import CardNav from "./CardNav";
import dreamlogo from "../assets/image/dream-catcher.png";

const Navbar = () => {
  const menuItems = [
    {
      label: "Rüya Yorumla",
      bgColor: "#1B1722",
      textColor: "#ffffff",
      links: [
        { label: "Yorumlama", href: "/DreamInterpret" },
        { label: "Semboller", href: "/Symbols" },
      ],
    },
    {
      label: "Genel",
      bgColor: "#2F293A",
      textColor: "#ffffff",
      links: [
        { label: "Anasayfa", href: "/" },
        { label: "İletişim", href: "/Contact" },
      ],
    },
    {
      label: "Sosyal",
      bgColor: "#5227FF",
      textColor: "#ffffff",
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
      ease="power3.out"
    />
  );
};

export default Navbar;
