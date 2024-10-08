import React, { useEffect, useRef, useState } from "react";
import "./SlideShow.css";

function SlideShow({ categories, posters }) {
    const [activePoster, setActivePoster] = useState(0);
    const [posterCategory, setPosterCategory] = useState(categories[0].tag);

    const thumbnailRef = useRef(null);
    const prevPosterCategory = useRef(null);

    useEffect(() => {
        const showPostersInterval = setInterval(() => {
            setActivePoster((prev) => {
                const newPos = prev < posters[posterCategory].length - 1 ? prev + 1 : 0;
                thumbnailRef.current.scrollLeft = 160 * newPos;
                return newPos;
            });
        }, 10000);

        return () => clearInterval(showPostersInterval);
    }, []);

    useEffect(() => {
        thumbnailRef.current.scrollLeft = 160 * activePoster;

        if (activePoster >= posters[posterCategory].length - 1)
            prevPosterCategory.current = posterCategory;
        // else prevPosterCategory.current = null;

        if (activePoster === 0 && prevPosterCategory.current == posterCategory) {
            const nextCategoryIndex =
                (categories.findIndex((ele) => ele.tag === posterCategory) + 1) % categories.length;
            setPosterCategory(categories[nextCategoryIndex].tag);
        }
    }, [activePoster]);

    return (
        <div className="slideshow">
            <div className="hero">
                {posters[posterCategory].map((poster, index) => (
                    <div key={index} className={activePoster === index ? "hero-item" : "hide"}>
                        <div className="hero-wrapper">

                        <div className="hero-gradient"></div>
                        <img
                            src={"https://image.tmdb.org/t/p/original/" + poster.backdrop_path}
                            className="hero-img"
                            />
                            </div>
                        <div className="content">
                            <h1 className="title">{poster.title ? poster.title : poster.name}</h1>
                            <p className="description">
                                {poster.overview.substr(0, 200)}
                                {poster.overview.substr(0, 200) !== poster.overview
                                    ? "..."
                                    : null}{" "}
                            </p>
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
                                onClick={() => {
                                    setPosterCategory(category.tag);
                                    setActivePoster(0);
                                }}
                                className={category.tag === posterCategory ? "active-heading" : ""}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </h1>
                <div className="thumbnail-images" ref={thumbnailRef}>
                    {posters[posterCategory].map((poster, index) => (
                        <img
                            src={"https://image.tmdb.org/t/p/original" + poster.poster_path}
                            key={index}
                            onClick={() => setActivePoster(index)}
                            className={
                                activePoster == index ? "active-thumbnail" : "inactive-thumbnail"
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SlideShow;
