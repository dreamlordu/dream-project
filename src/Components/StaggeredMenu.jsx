// ============================================================
// StaggeredMenu.jsx
// Sağdan (veya soldan) kayan animasyonlu tam ekran menü.
// GSAP ile katmanlı giriş/çıkış animasyonu yapar.
//
// DÜZELTİLEN HATALAR:
// 1. CSS bloğunun içine karışmış "poimport StaggeredMenu from ..." satırı silindi
// 2. .staggered-menu-panel width → clamp yerine %100 mobilde tam kaplar
// 3. .sm-prelayers da aynı şekilde %100 genişliğe ayarlandı
// 4. Panel ve pre-layer'lar her zaman ekranı tam kaplar (responsive)
// ============================================================

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#B497CF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/src/assets/logos/reactbits-gh-white.svg",
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  isFixed = false,
  accentColor = "#5227FF",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  // ── State ──────────────────────────────────────────────────
  const [open, setOpen] = useState(false);
  const openRef = useRef(false); // sync ref (state async olduğu için)

  // ── DOM Ref'leri ───────────────────────────────────────────
  const panelRef = useRef(null); // ana menü paneli
  const preLayersRef = useRef(null); // renk katmanları container
  const preLayerElsRef = useRef([]); // katman elemanları dizisi

  const plusHRef = useRef(null); // X ikonu yatay çizgi
  const plusVRef = useRef(null); // X ikonu dikey çizgi
  const iconRef = useRef(null); // ikon wrapper

  const textInnerRef = useRef(null); // "Menu / Close" yazısı iç kapsayıcı
  const textWrapRef = useRef(null); // yazı dış kapsayıcı

  // ── Animasyon metin satırları (döngü efekti için) ──────────
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  // ── GSAP timeline/tween referansları ──────────────────────
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false); // animasyon kilit flag'i

  const itemEntranceTweenRef = useRef(null);

  // ── İlk kurulum: tüm elemanları ekran dışına yerleştir ────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      // Renk katmanlarını topla
      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      // Panel ve katmanları ekran dışına koy (position'a göre)
      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      // İkon sıfırla
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });

      // Yazı sıfırla
      gsap.set(textInner, { yPercent: 0 });

      // Buton rengi
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert(); // cleanup
  }, [menuButtonColor, position]);

  // ── Açılış timeline'ını oluştur ────────────────────────────
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    // Önceki animasyonları iptal et
    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    // Animasyona girecek elemanları seç
    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));

    // Başlangıç pozisyonlarını sıfırla
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // 1. Renk katmanları stagger ile girer
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    // 2. Panel girer
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    // 3. Menü itemları aşağıdan yukarı animasyonla gelir
    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      // Numaralandırma fade-in
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity"]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    // 4. Sosyal linkler gelir
    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  // ── Menüyü açan fonksiyon ──────────────────────────────────
  const playOpen = useCallback(() => {
    if (busyRef.current) return; // animasyon devam ediyorsa engelle
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  // ── Menüyü kapatan fonksiyon ───────────────────────────────
  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        // Kapandıktan sonra animasyon state'lerini sıfırla
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        );
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        );
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });

        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  // ── İkon animasyonu (+ → X) ────────────────────────────────
  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      // X'e dönüştür
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      // + 'ya geri dön
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  // ── Buton renk geçişi ──────────────────────────────────────
  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();

      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  // ── Renk prop değişince butonu güncelle ────────────────────
  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  // ── "Menu ↔ Close" yazı döngüsü animasyonu ─────────────────
  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    // Döngü dizisi oluştur
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  // ── Toggle (menüyü aç/kapat) ───────────────────────────────
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  // ── Menüyü kapat (dışarı tıklanınca çağrılır) ─────────────
  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  // ── Dışarı tıklama dinleyicisi ─────────────────────────────
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  // ── JSX ────────────────────────────────────────────────────
  return (
    <div
      className={`sm-scope z-40 ${
        isFixed
          ? "fixed top-0 left-0 w-screen h-screen overflow-hidden"
          : "w-full h-full"
      }`}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper pointer-events-none relative w-full h-full"
        }
        style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* ── Renkli arka plan katmanları (animasyona girer) ── */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            // En fazla 4 renk al, ortadaki birini çıkar (3 katman için)
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#1e1e22", "#35353c"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* ── Header: Logo + Toggle butonu ── */}
        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-[2em] bg-transparent pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          {/* Logo */}
          <div
            className="sm-logo flex items-center select-none pointer-events-auto"
            aria-label="Logo"
          >
            <img
              src={logoUrl || "/src/assets/logos/reactbits-gh-white.svg"}
              alt="Logo"
              className="sm-logo-img block h-8 w-auto object-contain"
              draggable={false}
              width={110}
              height={24}
            />
          </div>

          {/* Menü aç/kapat butonu */}
          <button
            ref={toggleBtnRef}
            className="sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer text-[#e9e9ef] font-medium leading-none overflow-visible pointer-events-auto"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            {/* Dönen yazı "Menu / Close" */}
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"
              aria-hidden="true"
            >
              <span
                ref={textInnerRef}
                className="sm-toggle-textInner flex flex-col leading-none"
              >
                {textLines.map((l, i) => (
                  <span
                    className="sm-toggle-line block h-[1em] leading-none"
                    key={i}
                  >
                    {l}
                  </span>
                ))}
              </span>
            </span>

            {/* + / X ikonu */}
            <span
              ref={iconRef}
              className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
            </span>
          </button>
        </header>

        {/* ── Menü paneli ── */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            {/* ── Menü item listesi ── */}
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <a
                      className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                /* Item yoksa placeholder göster */
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {/* ── Sosyal linkler ── */}
            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff0000)]">
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/*
       * ── Scoped CSS ──────────────────────────────────────────────────────────
       * DÜZELTİLEN: .staggered-menu-panel kuralının başındaki bozuk
       * "poimport StaggeredMenu from ..." satırı tamamen silindi.
       *
       * Panel genişliği:
       * - Masaüstü: clamp(260px, 38vw, 420px) → dar değil, geniş değil
       * - Tablet/Mobil (<1024px ve <640px): width: 100% → tam ekran kaplar
       *
       * Pre-layers (renkli katmanlar) da aynı breakpoint'lerde %100 olur,
       * böylece animasyon sırasında panel ile hizalı kalır.
       */}
      <style>{`
        /* ── Temel yapı ── */
        .sm-scope .staggered-menu-wrapper {
          position: relative; width: 100%; height: 100%;
          z-index: 40; pointer-events: none;
        }

        /* ── Header ── */
        .sm-scope .staggered-menu-header {
          position: absolute; top: 0; left: 0; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 2em; background: transparent; pointer-events: none; z-index: 20;
        }
        .sm-scope .staggered-menu-header > * { pointer-events: auto; }

        /* ── Logo ── */
        .sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
        .sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }

        /* ── Toggle butonu ── */
        .sm-scope .sm-toggle {
          position: relative; display: inline-flex; align-items: center;
          gap: 0.3rem; background: transparent; border: none;
          cursor: pointer; color: #e9e9ef; font-weight: 500;
          line-height: 1; overflow: visible;
        }
        .sm-scope .sm-toggle:focus-visible {
          outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px;
        }

        /* ── Yazı döngüsü ── */
        .sm-scope .sm-toggle-textWrap {
          position: relative; margin-right: 0.5em;
          display: inline-block; height: 1em;
          overflow: hidden; white-space: nowrap;
          width: var(--sm-toggle-width, auto);
          min-width: var(--sm-toggle-width, auto);
        }
        .sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
        .sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }

        /* ── İkon ── */
        .sm-scope .sm-icon {
          position: relative; width: 14px; height: 14px;
          flex: 0 0 14px; display: inline-flex;
          align-items: center; justify-content: center; will-change: transform;
        }
        .sm-scope .sm-icon-line {
          position: absolute; left: 50%; top: 50%; width: 100%; height: 2px;
          background: currentColor; border-radius: 2px;
          transform: translate(-50%, -50%); will-change: transform;
        }
        .sm-scope .sm-line { display: none !important; }

        /* ── Ana menü paneli ──────────────────────────────────────────────── */
        /* Masaüstü: sağdan açılan dar panel                                  */
        .sm-scope .staggered-menu-panel {
          position: absolute; top: 0; right: 0;
          width: clamp(260px, 38vw, 420px);   /* masaüstü genişliği */
          height: 100%; background: white;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          display: flex; flex-direction: column;
          padding: 6em 2em 2em 2em;
          overflow-y: auto; z-index: 10;
        }
        /* Sol pozisyon */
        .sm-scope [data-position='left'] .staggered-menu-panel {
          right: auto; left: 0;
        }

        /* ── Renkli arka plan katmanları (masaüstü) ── */
        .sm-scope .sm-prelayers {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: clamp(260px, 38vw, 420px);   /* panel ile eşit genişlik */
          pointer-events: none; z-index: 5;
        }
        .sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
        .sm-scope .sm-prelayer {
          position: absolute; top: 0; right: 0; height: 100%; width: 100%;
          transform: translateX(0);
        }

        /* ── Panel içeriği ── */
        .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }

        /* ── Sosyal linkler ── */
        .sm-scope .sm-socials {
          margin-top: auto; padding-top: 2rem;
          display: flex; flex-direction: column; gap: 0.75rem;
        }
        .sm-scope .sm-socials-title {
          margin: 0; font-size: 1rem; font-weight: 500;
          color: var(--sm-accent, #ff0000);
        }
        .sm-scope .sm-socials-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: row;
          align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
        .sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
        .sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
        .sm-scope .sm-socials-list .sm-socials-link:hover,
        .sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
        .sm-scope .sm-socials-link:focus-visible {
          outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px;
        }
        .sm-scope .sm-socials-link {
          font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none;
          position: relative; padding: 2px 0; display: inline-block;
          transition: color 0.3s ease, opacity 0.3s ease;
        }
        .sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }

        /* ── Menü itemları ── */
        .sm-scope .sm-panel-title {
          margin: 0; font-size: 1rem; font-weight: 600;
          color: #fff; text-transform: uppercase;
        }
        .sm-scope .sm-panel-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .sm-scope .sm-panel-itemWrap {
          position: relative; overflow: hidden; line-height: 1;
        }
        .sm-scope .sm-panel-item {
          position: relative; color: #000; font-weight: 600;
          font-size: 4rem; cursor: pointer; line-height: 1;
          letter-spacing: -2px; text-transform: uppercase;
          transition: background 0.25s, color 0.25s;
          display: inline-block; text-decoration: none; padding-right: 1.4em;
        }
        .sm-scope .sm-panel-itemLabel {
          display: inline-block; will-change: transform; transform-origin: 50% 100%;
        }
        .sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }

        /* ── Numaralandırma counter'ı ── */
        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute; top: 0.1em; right: 3.2em;
          font-size: 18px; font-weight: 400;
          color: var(--sm-accent, #ff0000);
          letter-spacing: 0; pointer-events: none; user-select: none;
          opacity: var(--sm-num-opacity, 0);
        }

        /* ── Tablet (<1024px): Panel tam ekran kaplar ── */
        @media (max-width: 1024px) {
          .sm-scope .staggered-menu-panel {
            width: 100%;   /* tam genişlik */
            left: 0;
            right: 0;
          }
          .sm-scope .sm-prelayers {
            width: 100%;   /* katmanlar da tam genişlik */
            left: 0;
            right: 0;
          }
          /* Menü açıkken logo kararmış arka plana karşı okunabilir olsun */
          .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img {
            filter: invert(100%);
          }
        }

        /* ── Mobil (<640px): Panel tam ekran kaplar ── */
        @media (max-width: 640px) {
          .sm-scope .staggered-menu-panel {
            width: 100%;
            left: 0;
            right: 0;
          }
          .sm-scope .sm-prelayers {
            width: 100%;
            left: 0;
            right: 0;
          }
          .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img {
            filter: invert(100%);
          }
          /* Mobilde item fontunu biraz küçült */
          .sm-scope .sm-panel-item {
            font-size: 3rem;
            letter-spacing: -1px;
          }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
