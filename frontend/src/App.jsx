import "./App.css";
import { Routes, Route } from "react-router-dom";

import MyNavbar from "./components/MyNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerRoute from "./components/SellerRoute";

import Home from "./pages/Home";
import Wines from "./pages/Wines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import MyWines from "./pages/MyWines";
import CreateWine from "./pages/CreateWine";
import WineDetails from "./pages/WineDetails";
import EditWine from "./pages/EditWine";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <MyNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wines" element={<Wines />} />
        <Route path="/wines/:wineId" element={<WineDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-wines"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <MyWines />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-wine"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <CreateWine />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-wine/:wineId"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <EditWine />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
