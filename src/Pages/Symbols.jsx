import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { symbolDictionary } from "../data/symbolData";
import * as FiIcons from "react-icons/fi";

const DynamicIcon = ({ name, className }) => {
  const IconComponent = FiIcons[name];
  if (!IconComponent) return <FiIcons.FiHelpCircle className={className} />;
  return <IconComponent className={className} />;
};

const SymbolSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setError("");
    setResult(null);
    const searchKey = keyword.trim().toLocaleLowerCase("tr-TR");
    const foundSymbol = symbolDictionary[searchKey];
    if (foundSymbol) {
      setResult({ symbol: keyword, ...foundSymbol });
    } else {
      setError(
        "Bu sembol henüz sözlüğümüzde yok. Lütfen 'Yılan, Su, Ateş, Anahtar, Uçmak' gibi popüler sembolleri deneyin.",
      );
    }
  };

  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center px-4 md:px-12 py-12 select-none overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent)
        `,
        backgroundSize: "55px 55px",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Başlık */}
      <div className="w-full max-w-2xl text-center mb-8 z-10">
        <h2
          className="text-3xl font-extrabold tracking-tight mb-2"
          style={{ color: "#0f172a" }}
        >
          Kadim Sembol Sözlüğü
        </h2>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Sıfır gecikmeyle rüya sembollerinin bilinçaltınızdaki gizli
          şifrelerini çözün.
        </p>
      </div>

      {/* Arama formu */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-xl relative mb-8 z-10"
      >
        <input
          type="text"
          placeholder="Bir sembol arayın... (Örn: Yılan, Su, Ateş, Anahtar)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-5 pr-14 py-4 rounded-2xl text-base font-medium outline-none shadow-sm transition-all duration-200"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            border: "1px solid #e2e8f0",
            color: "#1e293b",
          }}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
        >
          <FiSearch className="text-lg" />
        </button>
      </form>

      {/* Hata mesajı */}
      {error && (
        <div
          className="text-sm font-medium px-4 py-3 rounded-xl mb-6 z-10 max-w-xl text-center"
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#475569",
          }}
        >
          {error}
        </div>
      )}

      {/* Sonuç kartı */}
      {result && (
        <div
          className="w-full max-w-xl rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden z-10"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(203,213,225,0.8)",
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "rgba(59,130,246,0.05)",
              filter: "blur(24px)",
            }}
          />

          {/* Başlık satırı */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: "#0f172a" }}
            >
              <DynamicIcon
                name={result.iconName}
                className="text-2xl text-white"
              />
            </div>
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-md"
                style={{ color: "#2563eb", backgroundColor: "#eff6ff" }}
              >
                {result.summary}
              </span>
              <h3
                className="text-2xl font-bold capitalize mt-1"
                style={{ color: "#0f172a" }}
              >
                {result.symbol}
              </h3>
            </div>
          </div>

          {/* Açıklama */}
          <div className="pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
            <p
              className="text-sm md:text-base leading-relaxed font-medium"
              style={{ color: "#475569" }}
            >
              {result.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymbolSearch;
