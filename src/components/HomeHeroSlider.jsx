import Slider from "react-slick";
import HeroCard from "./HeroCard";
import styles from '../styles/modules/HeroSlider.module.css';
import { useEffect, useState } from "react";
import { fetchMovies } from "../globals/global-utils";
import { MOVIE_LISTS } from "../globals/global-variables";
import { useConfig } from '../context/ConfigContext';

const HomeHeroSlider = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeSlideNum, setActiveSlideNum] = useState(0);

    // TODO: set to fade? and use https://react-slick.neostack.com/docs/example/slide-change-hooks 
    // to implement bg change
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: current => {
            setActiveSlideNum(current);
            console.log(current);
        },
    };

    const config = useConfig();



    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const backdrop_size = config.images.backdrop_sizes[3];

    useEffect(() => {
        async function loadMovies() {
            try {
                const m = await fetchMovies(MOVIE_LISTS.nowPlaying);
                setMovies(m.slice(0, 6));
            } catch (err) {
                setError(err.message || "Error loading movies, please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, []);


    if (loading) {
        return (<div className={styles.slider_container} >
            <div className="loader"></div>
        </div>);
    } else if (movies) {

        return (
            <div className={styles.slider_container} style={{
                backgroundImage: `url(${image_base_url}${backdrop_size}${movies[activeSlideNum].backdrop_path})`,
            }}>
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
        // Error
        return (<div className={styles.slider_container} >
            <p>{error}</p>
        </div>);

    }
}

export default HomeHeroSlider