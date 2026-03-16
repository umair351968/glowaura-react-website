import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NewArrival from "./pages/NewArrival";
import Sale from "./pages/Sale"; // Import Sale page
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/sale" element={<Sale />} /> {/* Add Sale route */}
        <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;