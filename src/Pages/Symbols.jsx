import React, { useState } from "react";
import { FiSearch, FiHelpCircle } from "react-icons/fi";
import { symbolDictionary } from "../data/symbolData"; // Az önce oluşturduğumuz dosya
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

    // Kullanıcının yazdığı kelimeyi küçük harfe çevirip sözlükte arıyoruz
    const searchKey = keyword.trim().toLowerCase("tr-TR");
    const foundSymbol = symbolDictionary[searchKey];

    if (foundSymbol) {
      setResult({
        symbol: keyword,
        ...foundSymbol,
      });
    } else {
      setError(
        "Bu sembol henüz sözlüğümüzde yok. Lütfen 'Yılan, Su, Ateş, Anahtar, Uçmak' gibi popüler sembolleri deneyin.",
      );
    }
  };

  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center bg-white border-b border-gray-100 px-4 md:px-12 py-12 select-none overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #f0f0f0 25%, #f0f0f0 26%, transparent 27%, transparent 74%, #f0f0f0 75%, #f0f0f0 76%, transparent 77%, transparent)
        `,
        backgroundSize: "55px 55px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full max-w-2xl text-center mb-8 z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
          Kadim Sembol Sözlüğü
        </h2>
        <p className="text-slate-500 text-sm">
          Sıfır gecikmeyle rüya sembollerinin bilinçaltınızdaki gizli
          şifrelerini çözün.
        </p>
      </div>

      {/* ARAMA FORMU */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-xl relative mb-8 z-10"
      >
        <input
          type="text"
          placeholder="Bir sembol arayın... (Örn: Yılan, Su, Ateş, Anahtar)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-5 pr-14 py-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 text-slate-800 text-base font-medium shadow-sm transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors duration-200"
        >
          <FiSearch className="text-lg" />
        </button>
      </form>

      {/* HATA MESAJI */}
      {error && (
        <div className="text-slate-600 text-sm font-medium bg-slate-100 border border-slate-200 px-4 py-3 rounded-xl mb-6 z-10 max-w-xl text-center">
          {error}
        </div>
      )}

      {/* SONUÇ KARTI */}
      {result && (
        <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-100/50 animate-fade-in relative overflow-hidden z-10">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center shadow-md text-white">
              <DynamicIcon
                name={result.iconName}
                className="text-2xl text-white"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {result.summary}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 capitalize mt-1">
                {result.symbol}
              </h3>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              {result.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymbolSearch;
