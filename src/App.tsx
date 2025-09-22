import "./index.css";
import Hom from "../page/paget";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { ProductPage } from "../pages/ProductPage";
import { OrderProcessing } from "../pages/CheckoutPage";
import { Toaster } from "react-hot-toast";
import { Login } from "../pages/Login";
import { LoginVerify } from "../pages/Login-verify";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Hom />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/orderProcessing" element={<OrderProcessing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginVerify" element={<LoginVerify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
