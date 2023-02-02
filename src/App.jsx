import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductsDetail from "./pages/ProductsDetail";
import Purchases from "./pages/Purchases";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <BrowserRouter>
      <NavBar />
      {isLoading && <Loader />}
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
