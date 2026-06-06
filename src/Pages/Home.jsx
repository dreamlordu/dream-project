import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrueFocus from "../Components/TrueFocus";
import Button from "../Components/Button";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const text =
    "Yapay zeka gücüyle rüyalarınızın gizemli dünyasını aralayın. Bilinçaltınızın mesajlarını keşfedin.";

  return (
    <div
      className="w-full min-h-[60vh] relative flex flex-col justify-center items-center rounded-3xl overflow-hidden select-none p-4 md:p-6 mb-3"
      style={{ backgroundColor: "#ffffff", border: "1px solid #f3f4f6" }}
    >
      <div className="flex flex-col items-center mt-24 text-center max-w-3xl z-10">
        <div className="text-5xl mb-6 opacity-90 drop-shadow-md animate-pulse">
          🕸️
        </div>

        <div className="mb-3">
          <TrueFocus
            sentence="Tabir-i Ruya"
            manualMode={false}
            blurAmount={5}
            borderColor="#5227FF"
            glowColor="rgba(82, 39, 255, 0.4)"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
        </div>

        <motion.p
          className="text-base md:text-lg font-medium max-w-xl leading-relaxed mb-8"
          style={{ color: "#64748b" }}
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

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
      />
    </div>
  );
};

export default Home;
