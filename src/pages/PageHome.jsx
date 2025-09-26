import { useEffect, useState } from "react";
import { fetchMovies } from "../globals/global-utils";
import HomeHeroSlider from "../components/HomeHeroSlider";
import { MOVIE_LISTS } from "../globals/global-variables";
import LoadingPage from "../components/LoadingPage";
import MovieTypeDisplay from "../components/MovieTypeDisplay";
import styles from '../styles/modules/Home.module.css';
import { useSearchParams } from "react-router-dom";

const PageHome = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);


    const [searchParams, setSearchParams] = useSearchParams();
    const newType = searchParams.get("type");

    const type = Object.keys(MOVIE_LISTS).includes(newType) ? newType : "popular";


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


            <div className={styles.tabs} id="type-selection">
                <input type="radio" id="popular" value="popular" name="tabs" checked={type === "popular"} onChange={(e) => setSearchParams({ type: e.target.value })} />
                <label className={styles.tab} htmlFor="popular">Popular</label>

                <input type="radio" id="upcoming" value="upcoming" name="tabs" checked={type === "upcoming"} onChange={(e) => setSearchParams({ type: e.target.value })} />
                <label className={styles.tab} htmlFor="upcoming">Upcoming</label>

                <input type="radio" id="nowPlaying" value="nowPlaying" name="tabs" checked={type === "nowPlaying"} onChange={(e) => setSearchParams({ type: e.target.value })} />
                <label className={styles.tab} htmlFor="nowPlaying">Now Playing</label>

                <input type="radio" id="topRated" value="topRated" name="tabs" checked={type === "topRated"} onChange={(e) => setSearchParams({ type: e.target.value })} />
                <label className={styles.tab} htmlFor="topRated">Top Rated</label>
                <span className={styles.glider}></span>
            </div>

            {type === "upcoming" && (
                <MovieTypeDisplay movieArray={upcoming} title="Upcoming" styles={styles} />
            )}

            {type === "popular" && (
                <MovieTypeDisplay movieArray={popular} title="Popular" styles={styles} />
            )}

            {type === "nowPlaying" && (
                <MovieTypeDisplay movieArray={nowPlaying} title="Now Playing" styles={styles} />
            )}

            {type === "topRated" && (
                <MovieTypeDisplay movieArray={topRated} title="Top Rated" styles={styles} />
            )}

        </main>
    );

}

export default PageHome