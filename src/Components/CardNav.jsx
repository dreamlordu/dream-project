import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const CardNav = ({
  logo,
  siteName = "Tabir-i",
  logoAlt = "Logo",
  sitename = "Ruya",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        const topBar = 60;
        const padding = 16;
        return topBar + contentEl.scrollHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    );
    return tl;
  }, [ease]);

  const toggleMenu = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  }, [isExpanded]);

  // Dışarı tıklayınca kapatma
  useLayoutEffect(() => {
    const handleClickOutside = (e) => {
      if (isExpanded && navRef.current && !navRef.current.contains(e.target))
        toggleMenu();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, toggleMenu]);

  // Timeline kurulumu
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline, items]);

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className="card-nav block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden"
        style={{ backgroundColor: baseColor }}
      >
        {/* Header: Logo Solda, Hamburger Sağda */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-6 z-[2]">
          <div className="flex items-center gap-3">
            <img src={logo} alt={logoAlt} className="h-[28px]" />
            <span
              className="font-extrabold text-lg"
              style={{ color: menuColor }}
            >
              {siteName}
              <span className="text-blue-500 font-extrabold">{sitename}</span>
            </span>
          </div>

          <div className="flex items-center">
            <HamburgerMenu isOpen={isHamburgerOpen} onClick={toggleMenu} />
          </div>
        </div>

        {/* İçerik */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] p-2 flex flex-col md:flex-row gap-2 ${isExpanded ? "visible" : "invisible"}`}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="nav-card p-4 rounded-lg flex-1 min-h-[70px]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="font-normal text-[18px]">{item.label}</div>
              <div className="mt-2 flex flex-col gap-1">
                {item.links?.map((lnk, i) =>
                  lnk.href.startsWith("http") ? (
                    <a
                      key={i}
                      href={lnk.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:opacity-75"
                      onClick={toggleMenu}
                    >
                      {lnk.label} <GoArrowUpRight />
                    </a>
                  ) : (
                    <Link
                      key={i}
                      to={lnk.href}
                      className="flex items-center gap-2 hover:opacity-75"
                      onClick={toggleMenu}
                    >
                      {lnk.label} <GoArrowUpRight />
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
