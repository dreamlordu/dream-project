import StaggeredMenu from "./StaggeredMenu";
import dreamlogo from "../assets/image/dream-catcher.png";
const Navbar = () => {
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
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",

        overflowX: "hidden",
        pointerEvents: "none",
      }}
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#000000"
        openMenuButtonColor="#ff3030"
        changeMenuColorOnOpen={true}
        colors={["#B497CF", "#5227FF"]}
        logoUrl={dreamlogo}
        accentColor="#5227FF"
        onNavigate={() => {}}
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
};

export default Navbar;
