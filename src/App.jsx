import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TvShows from "./pages/TvShows/TvShows";
import "./App.css";

function App() {
    return (
        <div>
            <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tv-shows" element={<TvShows />} />
                </Routes>
        </div>
    );
}

export default App;
