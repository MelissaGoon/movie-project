import { useParams } from "react-router-dom";
import styles from '../styles/modules/SingleMovie.module.css';
import { useEffect, useState } from "react";
import { fetchSingleMovie } from "../globals/global-utils";
import { useConfig } from '../context/ConfigContext';
import MovieInfo from "../components/MovieInfo";

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
    }, []);

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
                </section>

                <MovieInfo />


            </main>
        )
    } else {
        return (<main>
            <h1>Error</h1>
            <p>{error}</p>
        </main>)
    }

}

export default PageSingleMovie