import AppRouter from "./router/AppRouter";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Analytics />
      <AppRouter />
    </div>
  );
}

export default App;
