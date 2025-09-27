import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import { fetchSingleMovie, isSaved } from "../globals/global-utils";
import { useConfig } from '../context/ConfigContext';
import { useListContext } from "../context/ListContext";
import styles from '../styles/modules/SingleMovie.module.css';
import MovieInfo from "../components/MovieInfo";
import Button from "../components/Button";
import CastGallery from "../components/CastGallery";
import SimilarGallery from "../components/SimilarGallery";
import Poster from "../components/Poster";
import ErrorPage from "../components/ErrorPage";
import LoadingPage from "../components/LoadingPage";
import { useMediaQuery } from "@uidotdev/usehooks";
import { APP_TITLE } from "../globals/global-variables";

const PageSingleMovie = () => {
    const config = useConfig();
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { list, addToList, removeFromList } = useListContext();
    const [bgLoaded, setBgLoaded] = useState(false);

    const image_base_url = config.images.base_url;
    const largerScreen = useMediaQuery(
        "only screen and (min-width : 720px)"
    );

    const backdrop_size = largerScreen ? config.images.backdrop_sizes[3] : config.images.backdrop_sizes[1];
    const image_size = config.images.poster_sizes[4];

    useEffect(() => {
        async function loadMovie() {
            try {
                const movieD = await fetchSingleMovie(id);
                setMovieDetails(movieD);
                document.title = `${APP_TITLE} | ${movieD.title}`
            } catch (err) {
                setError(err.message || "Error loading movie, please try again later.");
            } finally {
                setLoading(false);
            }

        };
        loadMovie();
    }, [id]);

    const handleButtonClick = (movieObj, remove = false) => {
        if (remove) {
            removeFromList(movieObj);
        } else {
            addToList(movieObj);
        }
    }

    const handleBgLoad = () => {
        setBgLoaded(true);
    }

    if (loading) {
        return (<LoadingPage text="Loading app..." />);
    } else if (movieDetails) {
        return (
            <main id="site-main">
                <section className={styles.hero}>

                    {!bgLoaded && <img src={`${ASSETS_FOLDER_PATH}placeholder-background.svg`} alt="A placeholder backdrop" />}

                    <img src={movieDetails.backdrop_path ? `${image_base_url}${backdrop_size}${movieDetails.backdrop_path}` : `${ASSETS_FOLDER_PATH}placeholder-background.svg`}
                        alt={`Backdrop for ${movieDetails.title}`} onLoad={handleBgLoad} className={`fade_in ${bgLoaded ? "loaded" : ""}`} />
                    <div className={styles.hero_text}>
                        <h1>{movieDetails.title}</h1>
                        <p>{movieDetails.tagline}</p>
                    </div>
                </section>

                <div className={styles.movie_contents}>
                    <section className={styles.main_info}>
                        <Poster styles={styles} data={movieDetails} image_size={image_size} />

                        <div className={styles.info_right}>
                            <MovieInfo data={movieDetails} styles={styles} details={true} />

                            {isSaved(list, id) ? <Button text="Remove from List" onClick={() => handleButtonClick(movieDetails, true)} icon={`${ASSETS_FOLDER_PATH}saved-cream.svg`} /> :
                                <Button classes="body-cream" text="Add to List" onClick={() => handleButtonClick(movieDetails, false)} icon={`${ASSETS_FOLDER_PATH}not-saved.svg`} />}

                        </div>
                    </section>

                    {movieDetails.overview && <section className={styles.overview}>
                        <h2>Overview</h2>
                        <p>{movieDetails.overview}</p>
                    </section>}

                    {movieDetails.credits.cast.length > 0 && <section className={styles.cast}>
                        <h2>Cast</h2>
                        <CastGallery data={movieDetails} />
                    </section>}

                    {movieDetails.recommendations.results.length > 0 &&
                        <section className={styles.recs}>
                            <h2>Viewers Also Watched</h2>
                            <SimilarGallery movieArray={movieDetails.recommendations.results.slice(0, 12)} />
                        </section>}



                </div>



            </main>
        )
    } else {
        return (<ErrorPage text="This page does not exist..." error_msg={error} />)
    }

}

export default PageSingleMovie