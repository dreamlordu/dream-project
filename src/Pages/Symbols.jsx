// ============================================================
// SymbolSearch.jsx
// Kullanıcının bir sembol adı yazarak yerel sözlükten
// anlık sonuç almasını sağlayan arama bileşeni.
//
// DÜZELTİLEN HATALAR:
// 1. toLowerCase("tr-TR") → toLocaleLowerCase("tr-TR")
//    toLowerCase() argüman almaz; Türkçe İ/i dönüşümü için
//    toLocaleLowerCase("tr-TR") kullanılmalı.
// ============================================================

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { symbolDictionary } from "../data/symbolData";
import * as FiIcons from "react-icons/fi";

// ── Dinamik ikon bileşeni ────────────────────────────────────
// symbolDictionary'den gelen iconName string'ini react-icons'a çevirir.
// Bulunamazsa varsayılan ? ikonu gösterir.
const DynamicIcon = ({ name, className }) => {
  const IconComponent = FiIcons[name];
  if (!IconComponent) return <FiIcons.FiHelpCircle className={className} />;
  return <IconComponent className={className} />;
};

const SymbolSearch = () => {
  // ── State ────────────────────────────────────────────────
  const [keyword, setKeyword] = useState(""); // arama inputu
  const [result, setResult] = useState(null); // bulunan sembol verisi
  const [error, setError] = useState(""); // hata mesajı

  // ── Arama işlevi ─────────────────────────────────────────
  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setError("");
    setResult(null);

    /*
     * DÜZELTİLDİ: toLowerCase("tr-TR") → toLocaleLowerCase("tr-TR")
     * Neden: Türkçe'de büyük "İ" harfi toLowerCase() ile yanlış "i" olmaz,
     * toLocaleLowerCase("tr-TR") ise doğru şekilde "i" (noktalı) yapar.
     * Örnek: "İslami".toLowerCase()           → "i̇slami" (yanlış)
     *         "İslami".toLocaleLowerCase("tr-TR") → "islami" (doğru)
     */
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

  // ── JSX ──────────────────────────────────────────────────
  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center bg-white border-b border-gray-100 px-4 md:px-12 py-12 select-none overflow-hidden"
      style={{
        /* Izgara arka plan deseni */
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
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
          Kadim Sembol Sözlüğü
        </h2>
        <p className="text-slate-500 text-sm">
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
          className="w-full pl-5 pr-14 py-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 text-slate-800 text-base font-medium shadow-sm transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors duration-200"
        >
          <FiSearch className="text-lg" />
        </button>
      </form>

      {/* Hata mesajı */}
      {error && (
        <div className="text-slate-600 text-sm font-medium bg-slate-100 border border-slate-200 px-4 py-3 rounded-xl mb-6 z-10 max-w-xl text-center">
          {error}
        </div>
      )}

      {/* Sonuç kartı */}
      {result && (
        <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-100/50 animate-fade-in relative overflow-hidden z-10">
          {/* Dekoratif parlama efekti */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Sembol başlık satırı */}
          <div className="flex items-center gap-4 mb-6">
            {/* İkon kutusu */}
            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center shadow-md text-white">
              <DynamicIcon
                name={result.iconName}
                className="text-2xl text-white"
              />
            </div>

            <div>
              {/* Özet badge */}
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {result.summary}
              </span>
              {/* Sembol adı */}
              <h3 className="text-2xl font-bold text-slate-900 capitalize mt-1">
                {result.symbol}
              </h3>
            </div>
          </div>

          {/* Açıklama */}
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
