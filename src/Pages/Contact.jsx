import React from "react";
// react-icons içerisinden modern ve minimalist Lucide ikonlarını çekiyoruz
import { FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const contactDetails = [
    {
      id: 1,
      icon: (
        <FiMail className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
      ),
      title: "E-posta Adresi",
      value: "support@oneiromancyai.com",
      description: "Sorularınız ve iş birlikleri için bize yazın.",
    },
    {
      id: 2,
      icon: (
        <FiMapPin className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
      ),
      title: "Merkez Ofis",
      value: "İstanbul, Türkiye",
      description: "Bilinçaltının yapay zeka teknolojileriyle buluştuğu yer.",
    },
  ];

  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center bg-white border-b border-gray-100 px-4 md:px-12 py-16 select-none overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent)
        `,
        backgroundSize: "55px 55px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full max-w-4xl text-center mb-12 z-10 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Bizimle İletişime Geçin
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Rüyalarınız, geri bildirimleriniz veya platformumuz hakkında merak
          ettiğiniz her şey için buradayız.
        </p>
      </div>

      {/* İLETİŞİM KARTLARI GRİD ALANI */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10 px-2">
        {contactDetails.map((item) => (
          <div
            key={item.id}
            className="group bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-100/40 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Kart İçi Hafif Parlama Efekti */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-md border border-slate-800 mb-6 group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {item.title}
              </h3>
              <p className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-200 break-words">
                {item.value}
              </p>
            </div>

            <p className="text-slate-500 text-xs md:text-sm mt-4 pt-4 border-t border-slate-100 font-medium">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Alt Slogan / Dipnot */}
      <div className="mt-16 text-center text-xs text-slate-400 font-medium tracking-wide z-10">
        Oneiromancy AI • Bilinçaltınızın Yapay Zeka Rehberi
      </div>
    </div>
  );
};

export default Contact;
