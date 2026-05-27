// ============================================================
// Navbar.jsx
// Uygulamanın ana navigasyon bileşeni.
// StaggeredMenu'yu sarar ve ekranın tamamını kaplar.
// pointer-events: none ile arka planı tıklanabilir bırakır,
// menü açıkken kendi içinde tıklamalar aktif olur.
// ============================================================

import StaggeredMenu from "./StaggeredMenu";
import dreamlogo from "../assets/image/dream-catcher.png";

const Navbar = () => {
  // ── Menü linkleri (React Router path'leriyle birebir eşleşmeli) ──
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    {
      label: "Interpret",
      ariaLabel: "Dream interpreter",
      link: "/DreamInterpret",
    },
    { label: "Symbols", ariaLabel: "Dream symbols", link: "/Symbols" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/Contact" },
  ];

  // ── Sosyal medya linkleri ──
  const socialItems = [
    {
      label: "Instagram",
      link: "https://www.instagram.com/osman_.code?igsh=MTF5OG0yZmp1cGNiNA==",
    },
    { label: "GitHub", link: "https://github.com/dreamlordu" },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/osman-g%C3%B6z%C3%BCtok-63a5b8326/",
    },
  ];

  return (
    /*
     * Wrapper div:
     * - position: fixed  → her zaman ekranın üstünde kalır, scroll etkilemez
     * - top/left: 0, width/height: 100vw/100vh → tam ekran kaplar
     * - pointerEvents: none → arka planı tıklanabilir bırakır
     * - zIndex: 50 → diğer içeriklerin üstünde olsun
     * - overflow: hidden → taşan animasyon katmanlarını keser
     *
     * DÜZELTİLEN HATALAR:
     * 1. zIndex:10; → zIndex: 10,   (obje sözdiziminde ; olmaz)
     * 2. position: "absolute" → "fixed" (absolute, scroll ile kayıyordu)
     * 3. zIndex 10 → 50 (diğer z-index'lerle çakışmıyordu)
     */
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 50,
        overflowX: "hidden",
        pointerEvents: "none",
      }}
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#000000"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#B497CF", "#5227FF"]}
        logoUrl={dreamlogo}
        accentColor="#5227FF"
        isFixed={
          false
        } /* wrapper zaten fixed, ikinci kez sarmalamaya gerek yok */
        closeOnClickAway={true}
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
};

export default Navbar;
