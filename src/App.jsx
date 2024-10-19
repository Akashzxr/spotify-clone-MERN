import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
