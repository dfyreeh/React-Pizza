import "./index.css";
import Hom from "../page/paget";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import {ProductPage} from "../pages/ProductPage"
import {OrderProcessing} from "../pages/CheckoutPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hom />} />
      <Route path="/about" element={<h1>О нас</h1>} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/orderProcessing" element={<OrderProcessing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
