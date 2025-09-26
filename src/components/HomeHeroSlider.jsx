import Slider from "react-slick";
import HeroCard from "./HeroCard";
import styles from '../styles/modules/HeroSlider.module.css';
import { useConfig } from '../context/ConfigContext';
import { useState, useEffect } from "react";
import { ASSETS_FOLDER_PATH } from "../globals/global-variables";

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <button className={`${styles.arrowButton} ${className}`} onClick={onClick}>

            <svg width="32" height="53" viewBox="0 0 32 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M27.8928 4.33765L5.33765 26.8928L27.8928 49.4479" stroke="#FFF9ED" stroke-width="7" stroke-linecap="round" />

            </svg>
            <span className="screen-reader-only">Previous</span>
        </button>
    );
}

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <button className={`${styles.arrowButton} ${className}`} onClick={onClick}>

            <svg width="32" height="53" viewBox="0 0 32 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">

                <path d="M3.55514 4L26.1103 26.5551L3.55514 49.1103" stroke="#FFF9ED" stroke-width="7" stroke-linecap="round" />

            </svg>
            <span className="screen-reader-only">Next</span>
        </button>
    );
}


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
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />

    };



    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const backdrop_size = config.images.backdrop_sizes[3];

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
