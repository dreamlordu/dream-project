import { useState } from "react";
import { interpretDreamWithAI } from "../Service/geminiService";
import { GiCrystalBall } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const DreamInterpret = () => {
  // State Tanımlamaları
  const [selectedCategory, setSelectedCategory] = useState("Psikolojik");
  const [dreamText, setDreamText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Gördüğünüz rüya bilinçaltınızın derinliklerinden bir mesaj taşıyor olabilir. Anlatın, yorumlayalım...",
      time: "23:10",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Gönderim Fonksiyonu
  const handleSendDream = async () => {
    if (!dreamText.trim() || loading) return;

    const timeNow = getCurrentTime();
    setErrorMessage("");

    // 1. Kullanıcının yazdığı rüyayı chat akışına ekle
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: dreamText,
      time: timeNow,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const textToSend = dreamText;
    setDreamText("");

    try {
      // FIX: .trim() eklenerek kategorinin servise tertemiz gitmesi sağlandı
      const response = await interpretDreamWithAI(
        textToSend,
        selectedCategory.trim(),
      );

      // 3. Yapay zekanın cevabını chat akışına ekle
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "system",
          text: response,
          time: getCurrentTime(),
        },
      ]);
    } catch (error) {
      setErrorMessage(
        error.message || "Bir hata oluştu, lütfen tekrar deneyin.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[75vh] relative flex flex-col justify-between bg-white border border-gray-100 rounded-3xl overflow-hidden select-none p-4 md:p-6 mb-3"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent)
        `,
        backgroundSize: "55px 55px",
        backgroundRepeat: "repeat",
      }}
    >
      {/* 1. DINAMIK CHAT AKIŞ ALANI */}
      <div className="w-full flex-1 overflow-y-auto space-y-6 mb-4 pr-1 scrollbar-thin py-2">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"} w-full px-2 md:px-4`}
          >
            {/* Avatar kırpılma önlemleri (pl-1 / pr-1) korunuyor */}
            <div
              className={`chat-image avatar online ${msg.sender === "user" ? "pr-1" : "pl-1"}`}
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full ring ring-offset-base-100 ring-offset-2 flex items-center justify-center transition-all ${
                  msg.sender === "user"
                    ? "ring-emerald-300 bg-emerald-50"
                    : "ring-sky-300 bg-sky-50"
                }`}
              >
                {msg.sender === "user" ? (
                  <FaUserCircle className="w-7 h-7 md:w-8 md:h-8 text-emerald-600" />
                ) : (
                  <GiCrystalBall className="w-7 h-7 md:w-8 md:h-8 text-sky-600" />
                )}
              </div>
            </div>
            <div
              className={`chat-header font-semibold flex items-center gap-2 mb-1.5 text-sm md:text-base ${
                msg.sender === "user" ? "text-emerald-800" : "text-sky-800"
              }`}
            >
              {msg.sender === "user" ? "Siz" : "Rüya Yorumcusu"}
              <time className="text-xs md:text-sm font-normal text-gray-400">
                {msg.time}
              </time>
            </div>
            <div
              className={`chat-bubble font-medium shadow-sm border max-w-[85%] whitespace-pre-wrap text-sm md:text-base md:leading-relaxed p-3 md:p-4 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-emerald-100 text-emerald-900 border-emerald-200/50"
                  : "bg-sky-100 text-sky-900 border-sky-200/50"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Yükleniyor (Loading) Durumu */}
        {loading && (
          <div className="chat chat-start w-full animate-pulse px-2 md:px-4">
            <div className="chat-image avatar pl-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full ring ring-sky-200 ring-offset-base-100 ring-offset-2 flex items-center justify-center bg-sky-50">
                <GiCrystalBall className="w-7 h-7 md:w-8 md:h-8 text-sky-400 animate-spin" />
              </div>
            </div>
            <div className="chat-header font-semibold text-sky-800 mb-1.5 text-sm md:text-base">
              Rüya Yorumcusu
            </div>
            <div className="chat-bubble bg-sky-50 text-sky-700 border border-sky-100 max-w-[85%] flex items-center gap-2 text-sm md:text-base p-3 md:p-4 rounded-2xl">
              <span className="loading loading-dots loading-sm"></span> Rüyanız
              derinlemesine inceleniyor...
            </div>
          </div>
        )}
      </div>

      {/* 2. PANEL ALANI: Sekmeler, Uyarı/Hata Yazısı ve Input Kutusu */}
      <div className="w-full space-y-4 pt-2 mb-2 bg-white/90 backdrop-blur-sm">
        {/* KATEGORİ SEÇİM ALANI */}
        <div
          className={`tabs tabs-box bg-gray-100/80 p-1.5 rounded-xl flex w-full gap-1 ${
            loading ? "pointer-events-none opacity-70" : ""
          }`}
        >
          {["Psikolojik", "İslami", "Mistik"].map((cat) => (
            <input
              key={cat}
              type="radio"
              name="dream_tabs"
              className="tab flex-1 font-semibold text-sm md:text-base checked:!bg-accent checked:!text-white transition-all duration-200 disabled:text-white py-2 md:py-3"
              aria-label={cat}
              checked={selectedCategory === cat}
              disabled={loading}
              onChange={() => {
                if (!loading) {
                  setSelectedCategory(cat);
                  setErrorMessage("");
                }
              }}
            />
          ))}
        </div>

        {/* Akıllı Uyarı/Hata Kutusu */}
        <div
          role="alert"
          className={`alert p-3 rounded-xl border flex items-center justify-center shadow-sm transition-all duration-200 ${
            errorMessage
              ? "alert-error bg-red-50 border-red-200 text-red-800"
              : "alert-warning alert-outline text-amber-800"
          }`}
        >
          <span className="text-xs md:text-sm font-semibold text-center leading-relaxed">
            {errorMessage
              ? `⚠️ ${errorMessage}`
              : "Hangi kategoriye göre yorumlanacağını seçmezseniz rüyanız yorumlanmaz."}
          </span>
        </div>

        {/* Girdiler ve Gönder Butonu */}
        <div className="relative w-full flex items-center">
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendDream();
              }
            }}
            placeholder={`${selectedCategory} bakış açısıyla rüyanızı yazın...`}
            className="textarea textarea-accent w-full scrollbar-none resize-none pr-16 bg-white rounded-2xl shadow-md border border-gray-200 text-sm md:text-base p-3 md:p-4"
            rows={2}
            disabled={loading}
          ></textarea>

          <button
            onClick={handleSendDream}
            disabled={loading || !dreamText.trim()}
            className="btn btn-circle btn-accent btn-md absolute right-4 flex items-center justify-center shadow-md disabled:bg-gray-200 disabled:text-gray-400 transform scale-90 md:scale-100 transition-all"
          >
            <IoSend className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamInterpret;
