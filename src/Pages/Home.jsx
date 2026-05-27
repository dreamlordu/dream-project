// ============================================================
// Home.jsx
// Uygulamanın ana/giriş sayfası.
// Framer Motion ile harf harf yazı animasyonu,
// TrueFocus başlık bileşeni ve CTA butonu içerir.
// (Bu dosyada kod hatası yoktu, yorum satırları eklendi.)
// ============================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrueFocus from "../Components/TrueFocus";
import Button from "../Components/Button";

const Home = () => {
  // ── Framer Motion: container her harfi sırayla gösterir ──
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }, // her harf 50ms arayla gelir
    },
  };

  // ── Framer Motion: tek harf animasyonu (aşağıdan yukarı) ──
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Animasyonla gösterilecek metin
  const text =
    "Yapay zeka gücüyle rüyalarınızın gizemli dünyasını aralayın. Bilinçaltınızın mesajlarını keşfedin.";

  // ── JSX ──────────────────────────────────────────────────
  return (
    <div className="w-full h-[60vh] relative flex flex-col justify-center items-center bg-white border border-gray-100 rounded-3xl overflow-hidden select-none p-4 md:p-6 mb-3">
      <div className="flex flex-col items-center text-center max-w-3xl z-10">
        {/* Dekoratif emoji */}
        <div className="text-5xl mb-6 opacity-90 drop-shadow-md animate-pulse">
          🕸️
        </div>

        {/* Animasyonlu başlık */}
        <div className="mb-3">
          <TrueFocus
            sentence="Oneiromancy AI"
            manualMode={false}
            blurAmount={5}
            borderColor="var(--fallback-p,oklch(var(--p)))"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
        </div>

        {/* Harf harf gelen açıklama metni */}
        <motion.p
          className="text-base md:text-lg text-base-content/70 font-medium max-w-xl leading-relaxed mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA: Rüya yorumlama sayfasına git */}
        <Link to="/DreamInterpret" className="relative z-20">
          <Button />
        </Link>
      </div>

      {/* Alt gradient: içeriği nazikçe soldurur */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-base-100 to-transparent" />
    </div>
  );
};

export default Home;
