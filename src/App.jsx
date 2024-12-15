import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home";
import SearchResult from "./components/SearchResult";
import Playlist from "./pages/Playlist";
import PlaylistsMobile from "./components/PlaylistsMobile";

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
          <Route path="/playlists" element={<PlaylistsMobile />} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
