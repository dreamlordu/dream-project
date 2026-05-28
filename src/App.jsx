import AppRouter from "./router/AppRouter";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div>
      <Analytics />
      <AppRouter />
    </div>
  );
}

export default App;
