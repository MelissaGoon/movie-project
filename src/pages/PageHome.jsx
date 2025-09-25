import { useEffect, useState } from "react";
import { fetchMovies } from "../globals/global-utils";
import HomeHeroSlider from "../components/HomeHeroSlider";
import { MOVIE_LISTS } from "../globals/global-variables";
import ListGallery from "../components/ListGallery";
import LoadingPage from "../components/LoadingPage";
import MovieTypeDisplay from "../components/MovieTypeDisplay";
import styles from '../styles/modules/Home.module.css';

const PageHome = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [current, setCurrent] = useState("popular");

    useEffect(() => {

        async function loadAll() {
            try {
                const [popularRes, nowPlayingRes, upcomingRes, topRatedRes] = await Promise.all([
                    fetchMovies(MOVIE_LISTS.popular),
                    fetchMovies(MOVIE_LISTS.nowPlaying),
                    fetchMovies(MOVIE_LISTS.upcoming),
                    fetchMovies(MOVIE_LISTS.topRated),
                ])

                setPopular(popularRes);
                setNowPlaying(nowPlayingRes);
                setUpcoming(upcomingRes);
                setTopRated(topRatedRes);

            } catch (e) {
                console.error(e.message);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadAll();
    }, []);


    if (loading) {
        return (<LoadingPage text="Loading Movies..." />);
    }

    if (error) {
        return (<main className="error-page" id="site-main">
            <h1>Something went wrong</h1>
            <p>We couldn’t load the application.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </main>)
    }

    return (
        <main id="site-main">
            <h1 className="screen-reader-text">ghostlyDB</h1>
            <HomeHeroSlider popularArray={popular} />


            <div className={styles.tabs}>
                <input type="radio" id="popular" value="popular" name="tabs" defaultChecked onChange={(e) => setCurrent(e.target.value)} />
                <label className={styles.tab} htmlFor="popular">Popular</label>

                <input type="radio" id="upcoming" value="upcoming" name="tabs" onChange={(e) => setCurrent(e.target.value)} />
                <label className={styles.tab} htmlFor="upcoming">Upcoming</label>

                <input type="radio" id="nowPlaying" value="nowPlaying" name="tabs" onChange={(e) => setCurrent(e.target.value)} />
                <label className={styles.tab} htmlFor="nowPlaying">Now Playing</label>

                <input type="radio" id="topRated" value="topRated" name="tabs" onChange={(e) => setCurrent(e.target.value)} />
                <label className={styles.tab} htmlFor="topRated">Top Rated</label>
                <span className={styles.glider}></span>
            </div>

            {current === "upcoming" && (
                <MovieTypeDisplay movieArray={upcoming} title="Upcoming" styles={styles} />
            )}

            {current === "popular" && (
                <MovieTypeDisplay movieArray={popular} title="Popular" styles={styles} />
            )}

            {current === "nowPlaying" && (
                <MovieTypeDisplay movieArray={nowPlaying} title="Now Playing" styles={styles} />
            )}

            {current === "topRated" && (
                <MovieTypeDisplay movieArray={topRated} title="Top Rated" styles={styles} />
            )}

        </main>
    );

}

export default PageHome