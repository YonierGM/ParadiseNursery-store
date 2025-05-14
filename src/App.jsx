import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ProductList from "./pages/ProductList";
import Cart from "./features/cart/Cart";

function App() {
  return (
    <>
      <section className="flex flex-col justify-between h-[100dvh]">
        <BrowserRouter>
          <div className="header h-[93px]">
            <Header />
          </div>
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/productos" element={<ProductList />} />
              <Route path="/contacto" element={<Home />} />
              <Route path="/carrito" element={<Cart />} />
            </Routes>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </BrowserRouter>
      </section>
    </>
  );
}

export default App;
