import "./Home.css";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SlideShow from "../../components/SlideShow/SlideShow";

function Home() {
    return (
        <div className="home">
            <h1>I will have below</h1>
            <ul>
                <li>liked movies</li>
                <li>Recommendations</li>
            </ul>
            {/* <SlideShow /> */}
        </div>
    );
}

export default Home;
