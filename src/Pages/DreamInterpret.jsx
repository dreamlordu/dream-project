import { useState, useRef, useEffect } from "react";
import { interpretDreamWithAI } from "../Service/geminiService";
import { GiCrystalBall } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const DreamInterpret = () => {
  const [selectedCategory, setSelectedCategory] = useState("Psikolojik");
  const [dreamText, setDreamText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Gördüğünüz rüya bilinçaltınızın derinliklerinden bir mesaj taşıyor olabilir. Anlatın, yorumlayalım...",
      time: "23:10",
    },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSendDream = async () => {
    if (!dreamText.trim() || loading) return;
    setErrorMessage("");
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: dreamText,
      time: getCurrentTime(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const textToSend = dreamText;
    setDreamText("");
    try {
      const response = await interpretDreamWithAI(
        textToSend,
        selectedCategory.trim(),
      );
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

  const categories = ["Psikolojik", "İslami", "Mistik"];

  return (
    <div
      className="w-full h-[75vh] relative flex flex-col justify-between rounded-3xl overflow-hidden select-none p-4 md:p-6 mb-3"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #f3f4f6",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent)
        `,
        backgroundSize: "55px 55px",
      }}
    >
      {/* Chat akışı */}
      <div className="w-full flex-1 overflow-y-auto space-y-6 mb-4 pr-1 py-2">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex w-full px-2 md:px-4 ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3`}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isUser ? "#ecfdf5" : "#f0f9ff",
                  border: `2px solid ${isUser ? "#6ee7b7" : "#bae6fd"}`,
                }}
              >
                {isUser ? (
                  <FaUserCircle className="w-7 h-7 text-emerald-600" />
                ) : (
                  <GiCrystalBall className="w-7 h-7 text-sky-600" />
                )}
              </div>
              <div
                className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[75%]`}
              >
                <div
                  className="flex items-center gap-2 mb-1 text-sm font-semibold"
                  style={{ color: isUser ? "#065f46" : "#0c4a6e" }}
                >
                  {isUser ? "Siz" : "Rüya Yorumcusu"}
                  <span
                    className="text-xs font-normal"
                    style={{ color: "#9ca3af" }}
                  >
                    {msg.time}
                  </span>
                </div>
                <div
                  className="rounded-2xl p-3 md:p-4 text-sm md:text-base font-medium leading-relaxed whitespace-pre-wrap shadow-sm"
                  style={{
                    backgroundColor: isUser ? "#d1fae5" : "#e0f2fe",
                    color: isUser ? "#064e3b" : "#0c4a6e",
                    border: `1px solid ${isUser ? "#a7f3d0" : "#bae6fd"}`,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex flex-row items-start gap-3 px-2 md:px-4 animate-pulse">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "#f0f9ff",
                border: "2px solid #bae6fd",
              }}
            >
              <GiCrystalBall className="w-7 h-7 text-sky-400 animate-pulse" />
            </div>
            <div className="flex flex-col items-start max-w-[75%]">
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: "#0c4a6e" }}
              >
                Rüya Yorumcusu
              </div>
              <div
                className="rounded-2xl p-3 md:p-4 text-sm flex items-center gap-2"
                style={{
                  backgroundColor: "#f0f9ff",
                  color: "#0369a1",
                  border: "1px solid #bae6fd",
                }}
              >
                ⏳ Rüyanız derinlemesine inceleniyor...
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Alt panel */}
      <div
        className="w-full space-y-3 pt-2 mb-2 rounded-xl p-2"
        style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
      >
        {/* Kategori sekmeleri */}
        <div
          className="flex w-full gap-1 p-1 rounded-xl"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              disabled={loading}
              onClick={() => {
                if (!loading) {
                  setSelectedCategory(cat);
                  setErrorMessage("");
                }
              }}
              className="flex-1 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200"
              style={{
                backgroundColor:
                  selectedCategory === cat ? "#6d28d9" : "transparent",
                color: selectedCategory === cat ? "#ffffff" : "#374151",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Uyarı kutusu */}
        <div
          className="p-3 rounded-xl text-center text-xs md:text-sm font-semibold"
          style={{
            backgroundColor: errorMessage ? "#fef2f2" : "#fffbeb",
            border: `1px solid ${errorMessage ? "#fecaca" : "#fde68a"}`,
            color: errorMessage ? "#991b1b" : "#92400e",
          }}
        >
          {errorMessage
            ? `⚠️ ${errorMessage}`
            : "Hangi kategoriye göre yorumlanacağını seçmezseniz rüyanız yorumlanmaz."}
        </div>

        {/* Textarea + Gönder */}
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
            className="w-full resize-none pr-16 rounded-2xl shadow-md text-sm md:text-base p-3 md:p-4 outline-none"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              color: "#111827",
            }}
            rows={2}
            disabled={loading}
          />
          <button
            onClick={handleSendDream}
            disabled={loading || !dreamText.trim()}
            className="absolute right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all"
            style={{
              backgroundColor:
                loading || !dreamText.trim() ? "#e5e7eb" : "#7c3aed",
              color: loading || !dreamText.trim() ? "#9ca3af" : "#ffffff",
              cursor: loading || !dreamText.trim() ? "not-allowed" : "pointer",
            }}
          >
            <IoSend className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamInterpret;
