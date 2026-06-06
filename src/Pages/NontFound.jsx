import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <style>{`
        .nf-face { display:flex; justify-content:center; align-items:center; height:300px; color:#1a1a1a; }
        .nf-face .face { width:200px; }
        .nf-face .face__eyes,.nf-face .face__eye-lid,.nf-face .face__mouth-left,.nf-face .face__mouth-right,.nf-face .face__nose,.nf-face .face__pupil { animation: nf-eyes 1s 0.3s forwards; }
        .nf-face .face__eye-lid,.nf-face .face__pupil { animation-duration:4s; animation-delay:1.3s; animation-iteration-count:infinite; }
        .nf-face .face__eye-lid { animation-name:nf-eye-lid; }
        .nf-face .face__mouth-left { animation-name:nf-mouth-left; }
        .nf-face .face__mouth-right { animation-name:nf-mouth-right; }
        .nf-face .face__nose { animation-name:nf-nose; }
        .nf-face .face__pupil { animation-name:nf-pupil; }
        @keyframes nf-eye-lid { 0%,40%,45%,100%{transform:translateY(0)} 42.5%{transform:translateY(17.5px)} }
        @keyframes nf-eyes { from{transform:translateY(112.5px)} to{transform:translateY(15px)} }
        @keyframes nf-pupil { 0%,37.5%,40%,45%,87.5%,100%{stroke-dashoffset:0;transform:translate(0,0)} 12.5%,25%,62.5%,75%{transform:translate(-35px,0)} 42.5%{stroke-dashoffset:35;transform:translate(0,17.5px)} }
        @keyframes nf-mouth-left { from,50%{stroke-dashoffset:-102} to{stroke-dashoffset:0} }
        @keyframes nf-mouth-right { from,50%{stroke-dashoffset:102} to{stroke-dashoffset:0} }
        @keyframes nf-nose { from{transform:translate(0,0)} to{transform:translate(0,22.5px)} }
      `}</style>

      <div
        className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <main className="nf-face">
          <svg className="face" viewBox="0 0 320 380">
            <g
              fill="none"
              stroke="#1a1a1a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="25"
            >
              <g className="face__eyes" transform="translate(0,112.5)">
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
              <rect
                className="face__nose"
                x="132.5"
                y="112.5"
                width="55"
                height="155"
                rx="4"
                ry="4"
              />
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
        <h1 className="text-6xl font-black mt-4" style={{ color: "#111827" }}>
          404
        </h1>
        <p className="text-xl mt-2 mb-8" style={{ color: "#4b5563" }}>
          Aradığınız sayfa kaybolmuş görünüyor.
        </p>
        <Link
          to="/"
          className="px-8 py-3 font-semibold rounded-full transition-all duration-300 shadow-lg"
          style={{ backgroundColor: "#4f46e5", color: "#ffffff" }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </>
  );
};

export default NotFound;
