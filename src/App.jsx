import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home";
import SearchResult from "./components/searchResult";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/playlist" element={<Playlist />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
