import React from "react";
import { Link } from "react-router-dom";
import assets from "./../../assets/assets.js";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <ul className="nav-left">
                <li className="nav-list logo">
                    <img src={assets.logo} alt="" className="logo-icon" />
                </li>
                <li className="nav-list browse">
                    Browse
                    <img src={assets.caretIcon} alt="" />
                    <ul className="dropdown">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="dropdown-nav-list dropdown-movies">
                            <Link to="/movies">Movies</Link>
                        </li>
                        <li className="dropdown-nav-list dropdown-tv-shows">
                            <Link to="/tv-shows">TV Shows</Link>
                        </li>
                        <li className="dropdown-nav-list dropdown-browse-by-lang">
                            <Link to="/browse">Browse by Language</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-list home">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-list movies">
                    <Link to="/movies">Movies</Link>
                </li>
                <li className="nav-list tv-shows">
                    <Link to="/tv-shows">TV Shows</Link>
                </li>
                <li className="nav-list browse-by-lang">
                    <Link to="/browse">Browse by Language</Link>
                </li>
            </ul>
            <ul className="nav-right">
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
