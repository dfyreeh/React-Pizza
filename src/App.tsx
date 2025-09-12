import "./index.css";
import Hom from "../page/paget";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hom />} />
      <Route path="/about" element={<h1>О нас</h1>} />
      {/* <Route path="/product/:id" element={<ProductPage />} /> */}
      <Route path="*" element={<h1>404 — Страница не найдена</h1>} />
    </Routes>
  );
}

export default App;
