import React, { useEffect, useRef, useState } from "react";
import "./SlideShow.css";
import cards_data from "./../../assets/cards/Cards_data.js";

function SlideShow() {
    const [activeMovie, setActiveMovie] = useState(0);
    const [movies, setMovies] = useState([]);
    const thumbnailRef = useRef(null);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
        };
        fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setMovies(response.results);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const showMoviesInterval = setInterval(() => {
            setActiveMovie((prev) => {
                const newPos = prev < movies.length - 1 ? prev + 1 : 0;
                thumbnailRef.current.scrollLeft = 160 * newPos;
                return newPos;
            });
        }, 10000);

        // console.log("1");
        // console.log(movies);

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
                <h1 className="thumbnail-heading">Now Playing...</h1>
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
