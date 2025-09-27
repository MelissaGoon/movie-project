import Slider from "react-slick";
import HeroCard from "./HeroCard";
import styles from '../styles/modules/HeroSlider.module.css';
import { useConfig } from '../context/ConfigContext';
import { useState, useEffect } from "react";
import { ASSETS_FOLDER_PATH } from "../globals/global-variables";
import { PrevArrow, NextArrow } from "./Arrows";
import { useMediaQuery } from "@uidotdev/usehooks";

const HomeHeroSlider = ({ popularArray }) => {
    const config = useConfig();

    const [movies, setMovies] = useState([]);
    const [activeSlideNum, setActiveSlideNum] = useState(0);

    useEffect(() => {
        setMovies(popularArray.slice(0, 6));
    }, [popularArray]);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 7000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: current => {
            setActiveSlideNum(current);
        },
        customPaging: function (i) {
            return (
                <button className="dots" aria-controls={`slide-${i}`} aria-label={`Go to slide ${i + 1}`}>
                    <span className="screen-reader-text"> Slide {i + 1}</span>
                </button>
            );
        },
        dotsClass: "slick-dots ghostly-dots",
        prevArrow: <PrevArrow additionalClass="arrowButtonHero" />,
        nextArrow: <NextArrow additionalClass="arrowButtonHero" />

    };



    const image_base_url = config.images.base_url;
    const largerScreen = useMediaQuery(
        "only screen and (min-width : 720px)"
    );

    const backdrop_size = largerScreen ? config.images.backdrop_sizes[3] : config.images.backdrop_sizes[1];

    if (movies.length > 0) {

        return (
            <div className={styles.slider_container}>

                <img className={styles.slider_bg}
                    src={movies[activeSlideNum].backdrop_path ? `${image_base_url}${backdrop_size}${movies[activeSlideNum].backdrop_path}` : `${ASSETS_FOLDER_PATH}placeholder-background.svg`} alt={`Backdrop for ${movies[activeSlideNum].title}`} />

                <Slider {...settings}>
                    {
                        movies.map((movie, index) => {
                            return (<HeroCard key={movie.id} data={movie} slideNum={index + 1} />)
                        })
                    }
                </Slider>
            </div>
        );
    } else {
        return (<div className={styles.slider_container} >
            <p>Something went wrong...</p>
        </div>);

    }
}

export default HomeHeroSlider
