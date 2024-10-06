import React from "react";
import assets from "./../../assets/assets.js";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <img src={assets.logo} alt="" className="logo" />
                </li>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse by Language</li>
            </ul>
            <ul>
                <li>
                    <img src={assets.searchIcon} alt="" />
                </li>
                <li>Children</li>
                <li>
                    <img src={assets.bellIcon} alt="" />
                </li>
                <li>
                    <img src={assets.profileImg} alt="" />
                    <img src={assets.caretIcon} alt="" />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
