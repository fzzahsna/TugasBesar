import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Buku from "./pages/Buku";
import AddBuku from "./pages/AddBuku";
import Register from "./components/Register"; // Import halaman Register
import EditBuku from "./pages/EditBuku";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/peminjamans" element={<Products />} />
          <Route path="/buku" element={<Buku />} />
          <Route path="/peminjamans/add" element={<AddProduct />} />
          <Route path="/buku/add" element={<AddBuku />} />
          <Route path="/buku/edit/:id" element={<EditBuku />} />
          <Route path="/peminjamans/edit/:id" element={<EditProduct />} />
          <Route path="/register" element={<Register />} /> {/* Tambahkan rute untuk halaman registrasi */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
