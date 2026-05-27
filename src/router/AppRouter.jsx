import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Home from "../Pages/Home";
import DreamInterpret from "../Pages/DreamInterpret";
import Symbols from "../Pages/Symbols";
import Contact from "../Pages/Contact";
import NotFound from "../Pages/NontFound"; // İçe aktardık

const AppRouter = () => (
  <div className="flex flex-col min-h-screen w-full">
    <Navbar />
    <main className="flex-grow w-full mt-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DreamInterpret" element={<DreamInterpret />} />
        <Route path="/Symbols" element={<Symbols />} />
        <Route path="/Contact" element={<Contact />} />

        {/* 404 Rota Tanımı */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default AppRouter;
