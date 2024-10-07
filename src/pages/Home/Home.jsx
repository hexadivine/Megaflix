import "./Home.css";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SlideShow from "../../components/SlideShow/SlideShow";

function Home() {
    return (
        <div className="home">
            <Navbar />
            <SlideShow />
        </div>
    );
}

export default Home;
