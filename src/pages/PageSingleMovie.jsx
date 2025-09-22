import { useParams } from "react-router-dom";
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import styles from '../styles/modules/SingleMovie.module.css';
import { useEffect, useState } from "react";
import { fetchSingleMovie } from "../globals/global-utils";
import { useConfig } from '../context/ConfigContext';
import MovieInfo from "../components/MovieInfo";
import Button from "../components/Button";
import CastGallery from "../components/CastGallery";
import { Link } from "react-router-dom";

const PageSingleMovie = () => {
    const config = useConfig();
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const backdrop_size = config.images.backdrop_sizes[3];
    const image_size = config.images.poster_sizes[5];

    useEffect(() => {
        async function loadMovie() {
            try {
                const movieD = await fetchSingleMovie(id);
                setMovieDetails(movieD);
            } catch (err) {
                setError(err.message || "Error loading movie, please try again later.");
            } finally {
                setLoading(false);
            }

        };
        loadMovie();
    }, [id]);

    const handleAddList = () => {
        console.log("Add to list");
    }

    if (loading) {
        return (<main className="loading-page">
            <h1>Loading app...</h1>
            <div className="loader"></div>
        </main>);
    } else if (movieDetails) {
        return (
            <main>
                <section className={styles.hero} style={{
                    backgroundImage: `url(${image_base_url}${backdrop_size}${movieDetails.backdrop_path})`
                }}>
                    <h1>{movieDetails.title}</h1>
                    <p>{movieDetails.tagline}</p>
                </section>

                <div className={styles.movie_contents}>
                    <section className={styles.main_info}>
                        <img className={styles.poster} src={`${image_base_url}${image_size}${movieDetails.poster_path}`} alt={`Poster for ${movieDetails.title}`} />

                        <div className={styles.info_right}>
                            <MovieInfo data={movieDetails} styles={styles} details={true} />
                            <Button classes="body-cream" text="Add to List" onClick={handleAddList} icon={`${ASSETS_FOLDER_PATH}not-saved.svg`} />
                        </div>
                    </section>

                    <section className={styles.overview}>
                        <h2>Overview</h2>
                        <p>{movieDetails.overview}</p>
                    </section>

                    <section className={styles.cast}>
                        <h2>Cast</h2>
                        <CastGallery data={movieDetails} />
                    </section>

                    <section className={styles.recommended}>
                        <h2>Recommended</h2>

                    </section>

                </div>



            </main>
        )
    } else {
        return (<main className="error-page">
            <h1>This page does not extist...</h1>
            <p>{error}</p>
            <Link to="/"> Go Home </Link>
        </main>)
    }

}

export default PageSingleMovie