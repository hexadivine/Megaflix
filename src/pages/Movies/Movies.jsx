import "./Movies.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SlideShow from "../../components/SlideShow/SlideShow";

function Movies() {
    const categories = [
        { name: "Now Playing", tag: "now_playing" },
        { name: "Popular", tag: "popular" },
        { name: "Top Rated", tag: "top_rated" },
        { name: "Upcoming", tag: "upcoming" },
    ];

    const [movies, setMovies] = useState({});

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
        };

        Promise.all(
            categories.map(async (category) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${category.tag}?language=en-US&page=1`,
                    options
                );
                const data = await response.json();
                return { [category.tag]: data.results };
            })
        ).then((result) => {
            setMovies(Object.assign({}, ...result));
        });
    }, []);

    return (
        <div className="movies">
            <Navbar />
            {Object.keys(movies).length === categories.length ? (
                <SlideShow categories={categories} posters={movies} />
            ) : null}
        </div>
    );
}

export default Movies;
