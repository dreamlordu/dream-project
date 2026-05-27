// React bileşen isimleri büyük harfle başlamalıdır
const Button = () => {
  return (
    <>
      {/* JSX elemanlarını tek bir fragment içine aldık */}
      <button className="valorant-btn">
        <span className="valorant-btn-lg">
          <span className="valorant-btn-sl"></span>
          <span className="valorant-btn-text">Hemen Rüya Yorumla AI</span>
        </span>
      </button>

      {/* CSS sınıflarını yukarıdaki className isimleriyle tam eşleştirdik */}
      <style>{`
        .valorant-btn {
          appearance: none;
          -webkit-appearance: none;
          border: none;
          background: none;
          color: #0f172a;
          cursor: pointer;
          position: relative;
          padding: 8px;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 1px;
          transition: all .15s ease;
          display: inline-block;
        }

        /* Dış Çerçeve Çizgileri */
        .valorant-btn::before,
        .valorant-btn::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          left: 0;
          height: calc(50% - 5px);
          border: 1px solid #cbd5e1;
          transition: all .15s ease;
        }

        .valorant-btn::before {
          top: 0;
          border-bottom-width: 0;
        }

        .valorant-btn::after {
          bottom: 0;
          border-top-width: 0;
        }

        /* Tıklama Anında Çerçevenin Esnemesi */
        .valorant-btn:active::before,
        .valorant-btn:active::after {
          right: 3px;
          left: 3px;
        }

        .valorant-btn:active::before { top: 3px; }
        .valorant-btn:active::after { bottom: 3px; }

        /* Butonun Ana Gövdesi */
        .valorant-btn-lg {
          position: relative;
          display: block;
          padding: 12px 28px;
          color: #fff;
          background-color: #0f172a;
          overflow: hidden;
          box-shadow: inset 0px 0px 0px 1px transparent;
          transition: all .2s ease;
        }

        /* Sol Üst Köşe Süsü */
        .valorant-btn-lg::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 3px;
          background-color: #3b82f6;
        }

        /* Sağ Alt Köşe Süsü */
        .valorant-btn-lg::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          bottom: 0;
          width: 5px;
          height: 5px;
          background-color: #3b82f6;
          transition: all .2s ease;
        }

        /* Soldan Sağa Akan Modern Mavi Gradient Perde */
        .valorant-btn-sl {
          display: block;
          position: absolute;
          top: 0;
          bottom: -1px;
          left: -8px;
          width: 0;
          background: linear-gradient(90deg, #3b82f6, #4f46e5);
          transform: skew(-15deg);
          transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .valorant-btn-text {
          position: relative;
          z-index: 2;
        }

        /* HOVER EFEKTLERİ */
        .valorant-btn:hover {
          color: #0f172a;
        }

        .valorant-btn:hover::before,
        .valorant-btn:hover::after {
          right: -2px;
          left: -2px;
          border-color: #3b82f6;
        }

        .valorant-btn:hover .valorant-btn-sl {
          width: calc(100% + 15px);
        }

        .valorant-btn:hover .valorant-btn-lg::after {
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Button;
