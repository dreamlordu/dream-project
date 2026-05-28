const HamburgerMenu = ({ isOpen, onClick }) => {
  // Stil tanımlamaları
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    checkbox: { display: "none" },
    toggle: {
      position: "relative",
      width: "40px",
      cursor: "pointer",
      height: "25px",
    },
    bar: (isTop, isMiddle, isBottom) => ({
      position: "absolute",
      left: 0,
      right: 0,
      height: "4px",
      borderRadius: "2px",
      backgroundColor: "currentColor",
      transition: "all 0.35s cubic-bezier(.5,-0.35,.35,1.5)",
      bottom: isTop ? (isOpen ? "10px" : "18px") : "auto",
      top: isMiddle ? "10px" : isBottom ? (isOpen ? "10px" : "18px") : "auto",
      transform:
        isTop && isOpen
          ? "rotate(135deg)"
          : isBottom && isOpen
            ? "rotate(225deg)"
            : "none",
      opacity: isMiddle && isOpen ? 0 : 1,
    }),
  };

  return (
    <div style={styles.container}>
      <input
        type="checkbox"
        id="checkbox"
        checked={isOpen}
        onChange={onClick}
        style={styles.checkbox}
      />
      <label htmlFor="checkbox" style={styles.toggle}>
        <div style={styles.bar(true, false, false)}></div>
        <div style={styles.bar(false, true, false)}></div>
        <div style={styles.bar(false, false, true)}></div>
      </label>
    </div>
  );
};

export default HamburgerMenu;
