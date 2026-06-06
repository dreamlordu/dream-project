import { FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const contactDetails = [
    {
      id: 1,
      icon: <FiMail style={{ color: "#ffffff", fontSize: "20px" }} />,
      title: "E-posta Adresi",
      value: "osmangztk16@gmail.com",
      description: "Sorularınız ve iş birlikleri için bize yazın.",
    },
    {
      id: 2,
      icon: <FiMapPin style={{ color: "#ffffff", fontSize: "20px" }} />,
      title: "Merkez Ofis",
      value: "İstanbul, Türkiye",
      description: "Bilinçaltının yapay zeka teknolojileriyle buluştuğu yer.",
    },
  ];

  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center px-4 md:px-12 py-16 select-none overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent)
        `,
        backgroundSize: "55px 55px",
      }}
    >
      <div className="w-full max-w-4xl text-center mb-12 z-10">
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: "#0f172a" }}
        >
          Bizimle İletişime Geçin
        </h2>
        <p
          className="max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          style={{ color: "#64748b" }}
        >
          Rüyalarınız, geri bildirimleriniz veya platformumuz hakkında merak
          ettiğiniz her şey için buradayız.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10 px-2">
        {contactDetails.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(203,213,225,0.6)",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md mb-6"
                style={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                }}
              >
                {item.icon}
              </div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "#94a3b8" }}
              >
                {item.title}
              </h3>
              <p
                className="text-lg font-bold tracking-tight break-words"
                style={{ color: "#1e293b" }}
              >
                {item.value}
              </p>
            </div>
            <p
              className="text-xs md:text-sm mt-4 pt-4 font-medium"
              style={{ color: "#64748b", borderTop: "1px solid #f1f5f9" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-16 text-center text-xs font-medium tracking-wide z-10"
        style={{ color: "#94a3b8" }}
      >
        Tabir-i Ruya • Bilinçaltınızın Yapay Zeka Rehberi
      </div>
    </div>
  );
};

export default Contact;
