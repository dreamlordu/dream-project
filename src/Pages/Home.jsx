import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Framer Motion'ı import ettik
import TrueFocus from "../Components/TrueFocus";
import Button from "../Components/Button";

const Home = () => {
  // Animasyon ayarları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }, // Harfler arası gecikme
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const text =
    "Yapay zeka gücüyle rüyalarınızın gizemli dünyasını aralayın. Bilinçaltınızın mesajlarını keşfedin.";

  return (
    <div className="w-full h-[60vh] relative flex flex-col justify-center items-center bg-white border border-gray-100 rounded-3xl overflow-hidden select-none p-4 md:p-6 mb-3">
      {/* ... (Diğer arka plan efektleri aynı kalabilir) ... */}

      <div className="flex flex-col items-center text-center max-w-3xl z-10">
        <div className="text-5xl mb-6 opacity-90 drop-shadow-md animate-pulse">
          🕸️
        </div>

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

        {/* FRAMER MOTION İLE METİN ANIMASYONU */}
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

        <Link to="/DreamInterpret" className="relative z-20">
          <Button />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-base-100 to-transparent" />
    </div>
  );
};

export default Home;
