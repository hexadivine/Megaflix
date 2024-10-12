import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "./../../assets/assets.js";
import "./Navbar.css";

function Navbar() {
    const currentPage = window.location.pathname.substring(1);
    const [activeNavItem, setActiveNavItem] = useState(currentPage);
    const [genreList, setGenreList] = useState({});

    useState(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjkzNWU3NThkMzEzOGFmMzAxMDk1NTEzN2MyNTI4NiIsIm5iZiI6MTcyODQ1MTM2MS4zODMxODgsInN1YiI6IjY2ZmJlZTAyOWIxZjkxMjFhYmQ2NDRlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Li-T2YnJBAhQMQpCQO8xL7puz3W58R41MrfEbAOVzk",
            },
        };

        const fetchGenre = Promise.all(
            ["movie", "tv"].map(async (mediaType) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`,
                    options
                );
                const responseData = await response.json();
                console.log(responseData.genres);
                if (mediaType == "movie") return { movies: responseData.genres };
                return { "tv-shows": responseData.genres };
            })
        );

        fetchGenre.then((genre) => {
            const reducedGenre = genre.reduce((acc, cur) => ({ ...acc, ...cur }), {});
            setGenreList(reducedGenre);
        });
    }, []);

    return (
        <nav>
            <ul className="nav-left">
                <li className="menu">
                    <img src={assets.menuIcon} alt="" />
                </li>
                <li className="nav-list logo">
                    <img src={assets.logo} alt="" className="logo-icon" />
                </li>
                <li className="nav-list browse">
                    Browse
                    <img src={assets.caretIcon} className="caret-icon" alt="" />
                    <ul className="dropdown">
                        <li
                            className={`dropdown-nav-list dropdown-home ${
                                activeNavItem === "" ? "active" : ""
                            }`}
                            onClick={() => setActiveNavItem("")}
                        >
                            <Link to="/">Home</Link>
                        </li>
                        <li
                            className={`dropdown-nav-list dropdown-movies ${
                                activeNavItem === "movies" ? "active" : ""
                            }`}
                            onClick={() => setActiveNavItem("movies")}
                        >
                            <Link to="/movies">Movies</Link>
                        </li>
                        <li
                            className={`dropdown-nav-list dropdown-tv-shows ${
                                activeNavItem === "tv-shows" ? "active" : ""
                            }`}
                            onClick={() => setActiveNavItem("tv-shows")}
                        >
                            <Link to="/tv-shows">TV Shows</Link>
                        </li>
                        <li
                            className={`dropdown-nav-list dropdown-browse-by-genre ${
                                activeNavItem === "browse-by-genre" ? "active" : ""
                            }`}
                            onClick={() => setActiveNavItem("browse-bu-genre")}
                        >
                            <Link to="/browse">Browse by Genre</Link>
                        </li>
                    </ul>
                </li>
                <li
                    className={`nav-list home ${activeNavItem === "" ? "active" : ""}`}
                    onClick={() => setActiveNavItem("")}
                >
                    <Link to="/">Home</Link>
                </li>
                <li
                    className={`nav-list movies ${activeNavItem === "movies" ? "active" : ""}`}
                    onClick={() => setActiveNavItem("movies")}
                >
                    <Link to="/movies">Movies</Link>
                </li>
                <li
                    className={`nav-list tv-shows ${activeNavItem === "tv-shows" ? "active" : ""}`}
                    onClick={() => setActiveNavItem("tv-shows")}
                >
                    <Link to="/tv-shows">TV Shows</Link>
                </li>
                <li
                    className={`nav-list browse-by-genre ${
                        activeNavItem === "browse-by-genre" ? "active" : ""
                    }`}
                    onClick={() => setActiveNavItem("browse-by-genre")}
                >
                    Browse by Genre
                    <img src={assets.caretIcon} alt="" className="caret-icon" />
                    <div className="dropdown-genre">
                        <ul className="dropdown-genre-list">
                            {Object.keys(genreList).length === 2
                                ? genreList[currentPage].map((genre, index) => (
                                      <li key={index}>
                                          <Link to={genre.id}>{genre.name}</Link>
                                      </li>
                                  ))
                                : null}
                        </ul>
                    </div>
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
