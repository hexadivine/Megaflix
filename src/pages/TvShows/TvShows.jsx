import "./TvShows.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SlideShow from "../../components/SlideShow/SlideShow";

function TvShows() {
    const categories = [
        { name: "Top Rated", tag: "top_rated" },
        { name: "Airing Today", tag: "airing_today" },
        { name: "On The Air", tag: "on_the_air" },
        { name: "Popular", tag: "popular" },
    ];

    const [tvSeries, setTvSeries] = useState({});

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
                    `https://api.themoviedb.org/3/tv/${category.tag}?language=en-US&page=1`,
                    options
                );
                const data = await response.json();
                return { [category.tag]: data.results };
            })
        ).then((result) => {
            setTvSeries(Object.assign({}, ...result));
        });
    }, []);

    return (
        <div className="tv-shows">
            <Navbar />
            {Object.keys(tvSeries).length === categories.length ? (
                <SlideShow categories={categories} posters={tvSeries} />
            ) : null}
        </div>
    );
}

export default TvShows;
