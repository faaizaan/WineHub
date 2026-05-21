import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Home from "./pages/Home";
import Wines from "./pages/Wines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import MyWines from "./pages/MyWines";
import CreateWine from "./pages/CreateWine";

function App() {
  return (
    <>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wines" element={<Wines />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/my-wines" element={<MyWines />} />
        <Route path="/create-wine" element={<CreateWine />} />
      </Routes>
    </>
  );
}

export default App;
