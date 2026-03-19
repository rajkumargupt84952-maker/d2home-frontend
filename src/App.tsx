import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import ProductByCategory from "./pages/Product-by-category";
import ProductDetail from "./pages/Product-detail";
import Checkout from "./pages/Check-out";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/Orders-detail";
import { CartProvider } from "./contexts/cartContext";
  import { ToastContainer, toast } from 'react-toastify';
import FruitVegetables from "./pages/Fruit-vegetables";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/all" replace />} />
            <Route path="all" element={<Home />} />
            <Route path="/products-by-category/:id" element={<ProductByCategory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/fruit-vegetables" element={<FruitVegetables />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />

           
          </Route>
        </Routes>
 <ToastContainer />

        </CartProvider>
    </ThemeProvider>
  );
}

export default App;
