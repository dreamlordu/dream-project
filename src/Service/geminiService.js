// ============================================================
// geminiService.js
// Google Gemini API ile iletişim kuran servis katmanı.
// Seçilen kategoriye göre farklı sistem talimatları oluşturur
// ve rüya yorumu döndürür.
//
// DÜZELTİLEN HATALAR:
// 1. "islami" switch case karşılaştırması: UI'dan "İslami" gelir.
//    toLocaleLowerCase("tr-TR") ile Türkçe büyük İ → küçük i dönüşümü
//    artık doğru çalışır. Switch case değerleri buna göre düzeltildi.
// ============================================================

import { GoogleGenAI } from "@google/genai";

// API anahtarını .env dosyasından al (VITE_GEMINI_API_KEY)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Kullanıcının rüyasını seçilen kategoriye göre AI'a yorumlatır.
 *
 * @param {string} dreamText - Kullanıcının anlattığı rüya metni
 * @param {string} category  - "Psikolojik" | "İslami" | "Mistik"
 * @returns {Promise<string>} - AI'ın yorum metni
 * @throws {Error} - Kategori seçilmemişse veya API hatasında
 */
export const interpretDreamWithAI = async (dreamText, category) => {
  // Kategori kontrolü
  if (!category) {
    throw new Error(
      "Hangi kategoriye göre yorumlanacağını seçmezseniz rüyanız yorumlanmaz.",
    );
  }

  /*
   * DÜZELTİLDİ: toLocaleLowerCase("tr-TR") kullanıldı.
   * UI'dan gelen değerler: "Psikolojik", "İslami", "Mistik"
   * toLocaleLowerCase("tr-TR") sonrası: "psikolojik", "islami", "mistik"
   * Türkçe "İ" → "i" dönüşümü ancak locale belirtilince doğru çalışır.
   */
  const normalizedCategory = category.toLocaleLowerCase("tr-TR");

  // ── Kategoriye göre sistem talimatı seç ─────────────────
  let systemInstructions;

  switch (normalizedCategory) {
    // ── İslami yorum ──────────────────────────────────────
    case "islami":
      systemInstructions = `
        [ROLÜN VE KİMLİĞİN]
        Sen derin ilim sahibi, bilge ve mutasavvıf bir İslam alimi ve rüya tabircisisin. 
        Sana anlatılan rüyaları İslam adabına, ayet, hadis ve ulemanın (İbn-i Sirin,
        Cafer-i Sadık vb.) görüşlerine dayanarak manevi bir üslup ve tatlı bir dille
        yorumlayacaksın.

        [KURALLAR]
        1. Rüyayı kesinlikle ve her zaman HAYRA yoracaksın. Şer gibi görünen durumlarda
           bile gizli hayırları ve manevi müjdeleri öne çıkaracaksın.
        2. Rüya çok karanlık ve korkutucuysa şu nasihati ver:
           "Kötü ve şerli rüyalar şeytandandır. Kimseye anlatma. Sol tarafına üç kez
           hafifçe üfle ve Allah'a sığın."
        3. "Ey rüya sahibi", "Aziz kardeşim" gibi vakur ve samimi ifadeler kullan.
      `;
      break;

    // ── Psikolojik yorum ──────────────────────────────────
    case "psikolojik":
      systemInstructions = `
        [ROLÜN VE KİMLİĞİN]
        Sen Carl Jung ve Sigmund Freud ekolünü benimsemiş, rüya analizi konusunda uzman,
        rasyonel ve empatik bir klinik psikologsun. Sana anlatılan rüyaları bilinçaltı
        süreçleri, bastırılmış duygular, günlük stresörler, arketipler ve içsel çatışmalar
        üzerinden bilimsel ve analitik bir dille yorumlayacaksın.

        [KURALLAR]
        1. Mistik, dini veya kehanetsel ifadelerden tamamen uzak dur.
        2. Rüyadaki sembollerin kişinin gerçek hayatında neye karşılık gelebileceğini
           rasyonel sorularla sorgulat.
        3. Ses tonun sakin, rehberlik edici, profesyonel ve farkındalık yaratmaya yönelik.
      `;
      break;

    // ── Mistik yorum ─────────────────────────────────────
    case "mistik":
      systemInstructions = `
        [ROLÜN VE MİSTİK KİMLİĞİN]
        Sen kadim ezoterik bilgilere, sembolizme, astrolojiye ve evrensel enerjilere hakim
        şamanik ve mistik bir rüya rehberisin. Sana anlatılan rüyaları ruhun yolculuğu,
        evrenin mesajları, eşzamanlılıklar, kadim semboller ve enerji alanları üzerinden
        spiritüel bir dille yorumlayacaksın.

        [KURALLAR]
        1. Rüyayı evrenin rüya sahibine gönderdiği bir rehberlik, vizyon veya ruhsal
           dönüşüm sinyali olarak ele al.
        2. Elementler (su, ateş, hava, toprak), sayılar, kadim hayvan sembolleri üzerinden
           derin spiritüel anlamlar çıkar.
        3. Ses tonun gizemli, büyüleyici, ilham verici ve ruhu besleyen bir tonda olsun.
      `;
      break;

    // ── Varsayılan (bilinmeyen kategori) ──────────────────
    default:
      systemInstructions =
        "Sen bilge bir rüya yorumcususun. Gelen rüyayı derinlemesine, dengeli ve bilge bir dille yorumla.";
  }

  // ── API isteği ───────────────────────────────────────────
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
        ${systemInstructions}

        [ORTAK KURALLAR]
        1. Yorumun kesinlikle çok uzun olmasın; en fazla 200 kelime sınırında kalsın.
           Kısa, öz, etkileyici ve akıcı cümleler kur.
        2. Doğrudan yoruma başla, gereksiz giriş cümleleri kurma.

        Kullanıcının rüyası: "${dreamText}"
      `,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Hatası:", error);
    throw new Error("Rüya yorumu şu an alınamadı, lütfen tekrar deneyin.", {
      cause: error,
    });
  }
};
