// ============================================================
// NotFound.jsx
// 404 sayfası: Animasyonlu yüz SVG'si + "Ana Sayfaya Dön" butonu.
// React Router'ın <Link> bileşeniyle sayfa yenilenmeden yönlendirir.
// ============================================================

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      {/* ── Yüz animasyonu için scoped CSS ── */}
      <style>{`
        /* Animasyonları izole etmek için özel container class'ı */
        .my-custom-face-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          background: #ffffff00;
          color: #1a1a1a;
        }

        .my-custom-face-container .face { width: 200px; }

        /* Göz ve ağız elemanları: sayfa yüklenince aşağıdan yukarı gelir */
        .my-custom-face-container .face__eyes,
        .my-custom-face-container .face__eye-lid,
        .my-custom-face-container .face__mouth-left,
        .my-custom-face-container .face__mouth-right,
        .my-custom-face-container .face__nose,
        .my-custom-face-container .face__pupil {
          animation: eyes 1s 0.3s forwards;
        }

        /* Göz kapağı ve göz bebeği döngüsel animasyon */
        .my-custom-face-container .face__eye-lid,
        .my-custom-face-container .face__pupil {
          animation-duration: 4s;
          animation-delay: 1.3s;
          animation-iteration-count: infinite;
        }

        /* Her elemanın kendi animasyonu */
        .my-custom-face-container .face__eye-lid   { animation-name: eye-lid; }
        .my-custom-face-container .face__mouth-left  { animation-name: mouth-left; }
        .my-custom-face-container .face__mouth-right { animation-name: mouth-right; }
        .my-custom-face-container .face__nose        { animation-name: nose; }
        .my-custom-face-container .face__pupil       { animation-name: pupil; }

        /* Göz kırpma animasyonu */
        @keyframes eye-lid {
          0%, 40%, 45%, 100% { transform: translateY(0); }
          42.5% { transform: translateY(17.5px); }
        }

        /* Gözler aşağıdan yukarı çıkar */
        @keyframes eyes {
          from { transform: translateY(112.5px); }
          to   { transform: translateY(15px); }
        }

        /* Göz bebeği sola sağa kayar, kırpınca kapanır */
        @keyframes pupil {
          0%, 37.5%, 40%, 45%, 87.5%, 100% { stroke-dashoffset: 0; transform: translate(0, 0); }
          12.5%, 25%, 62.5%, 75%            { transform: translate(-35px, 0); }
          42.5%                             { stroke-dashoffset: 35; transform: translate(0, 17.5px); }
        }

        /* Ağız sol ve sağ köşe animasyonları */
        @keyframes mouth-left  { from, 50% { stroke-dashoffset: -102; } to { stroke-dashoffset: 0; } }
        @keyframes mouth-right { from, 50% { stroke-dashoffset: 102;  } to { stroke-dashoffset: 0; } }

        /* Burun aşağı iner */
        @keyframes nose {
          from { transform: translate(0, 0); }
          to   { transform: translate(0, 22.5px); }
        }
      `}</style>

      {/* ── Sayfa içeriği ── */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-in fade-in duration-700">
        {/* Animasyonlu yüz SVG */}
        <main className="my-custom-face-container">
          <svg className="face" viewBox="0 0 320 380">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="25"
            >
              {/* Gözler */}
              <g className="face__eyes" transform="translate(0,112.5)">
                {/* Sol göz */}
                <g transform="translate(15,0)">
                  <polyline
                    className="face__eye-lid"
                    points="37,0 0,120 75,120"
                  />
                  <polyline
                    className="face__pupil"
                    points="55,120 55,155"
                    strokeDasharray="35 35"
                  />
                </g>
                {/* Sağ göz */}
                <g transform="translate(230,0)">
                  <polyline
                    className="face__eye-lid"
                    points="37,0 0,120 75,120"
                  />
                  <polyline
                    className="face__pupil"
                    points="55,120 55,155"
                    strokeDasharray="35 35"
                  />
                </g>
              </g>

              {/* Burun */}
              <rect
                className="face__nose"
                x="132.5"
                y="112.5"
                width="55"
                height="155"
                rx="4"
                ry="4"
              />

              {/* Ağız (sol + sağ parça) */}
              <g transform="translate(65,334)" strokeDasharray="102 102">
                <path
                  className="face__mouth-left"
                  d="M 0 30 C 0 30 40 0 95 0"
                />
                <path
                  className="face__mouth-right"
                  d="M 95 0 C 150 0 190 30 190 30"
                />
              </g>
            </g>
          </svg>
        </main>

        {/* 404 başlık */}
        <h1 className="text-6xl font-black text-gray-900 mt-4">404</h1>

        {/* Açıklama */}
        <p className="text-xl text-gray-600 mt-2 mb-8">
          Aradığınız sayfa kaybolmuş görünüyor.
        </p>

        {/* Ana sayfaya dön butonu */}
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </>
  );
};

export default NotFound;
