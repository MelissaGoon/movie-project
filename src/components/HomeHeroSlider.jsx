import Slider from "react-slick";
import HeroCard from "./HeroCard";
import styles from '../styles/modules/HeroSlider.module.css';
import { useConfig } from '../context/ConfigContext';
import { useState, useEffect } from "react";

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
        // autoplay: true,
        // autoplaySpeed: 7000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: current => {
            setActiveSlideNum(current);
        },
        customPaging: function () {
            return (
                // TODO: make it look
                <button className="dots"></button>
            );
        },
        dotsClass: "ghostly-dots, ghostly-thumb",

    };



    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const backdrop_size = config.images.backdrop_sizes[3];

    if (movies.length > 0) {

        return (
            <div className={styles.slider_container}>

                <img className={styles.slider_bg}
                    src={`${image_base_url}${backdrop_size}${movies[activeSlideNum].backdrop_path}`} alt={`Backdrop for ${movies[activeSlideNum].title}`} />

                <Slider {...settings}>
                    {
                        movies.map((movie) => {
                            return (<HeroCard key={movie.id} data={movie} />)
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
