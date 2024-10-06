import React, { useEffect, useRef, useState } from "react";
import "./SlideShow.css";
import cards_data from "./../../assets/cards/Cards_data.js";

function SlideShow() {
    const [activeMovie, setActiveMovie] = useState(0);
    const [movieCategory, setMovieCategory] = useState("now_playing");
    const [movies, setMovies] = useState([]);
    const thumbnailRef = useRef(null);

    const categories = [
        { name: "Now Playing", tag: "now_playing" },
        { name: "Popular", tag: "popular" },
        { name: "Top Rated", tag: "top_rated" },
        { name: "Upcoming", tag: "upcoming" },
        { name: "Liked", tag: "upcoming" },
        { name: "Recommendations", tag: "upcoming" },
        { name: "Liked by Friends", tag: "upcoming" },
        { name: "WatchList", tag: "upcoming" },
    ];

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
        };
        fetch(`https://api.themoviedb.org/3/movie/${movieCategory}?language=en-US&page=1`, options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setMovies(response.results);
            })
            .catch((err) => console.error(err));
    }, [movieCategory]);

    useEffect(() => {
        const showMoviesInterval = setInterval(() => {
            setActiveMovie((prev) => {
                const newPos = prev < movies.length - 1 ? prev + 1 : 0;
                thumbnailRef.current.scrollLeft = 160 * newPos;
                return newPos;
            });
        }, 10000);

        return () => clearInterval(showMoviesInterval);
    }, [movies]);

    useEffect(() => {
        thumbnailRef.current.scrollLeft = 160 * activeMovie;
    }, [activeMovie]);

    return (
        <div className="slideshow">
            <div className="hero">
                {movies.map((movie, index) => (
                    <div key={index} className={activeMovie === index ? "hero-item" : "hide"}>
                        <div className="hero-gradient"></div>
                        <img
                            src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
                            className="hero-img"
                        />
                        <div className="content">
                            <h1 className="title">{movie.title}</h1>
                            <p className="description">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="thumbnail">
                <h1 className="thumbnail-heading">
                    <ul className="thumbnail-heading-list">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                onClick={() => setMovieCategory(category.tag)}
                                className={category.tag === movieCategory ? "active-heading" : ""}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </h1>
                <div className="thumbnail-images" ref={thumbnailRef}>
                    {movies.map((movie, index) => (
                        <img
                            src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                            key={index}
                            onClick={() => setActiveMovie(index)}
                            className={
                                activeMovie == index ? "active-thumbnail" : "inactive-thumbnail"
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SlideShow;
