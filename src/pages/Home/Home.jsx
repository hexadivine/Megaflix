import "./Home.css";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SlideShow from "../../components/SlideShow/SlideShow";

function Home() {
    return (
        <div className="home">
            <Navbar />
            {/* <Hero /> */}
            <SlideShow />
        </div>
    );
}

export default Home;
