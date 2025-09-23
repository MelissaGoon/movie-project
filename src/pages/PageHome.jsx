import { useEffect, useState } from "react";
import { fetchMovies } from "../globals/global-utils";
import HomeHeroSlider from "../components/HomeHeroSlider";
import { MOVIE_LISTS } from "../globals/global-variables";
import ListGallery from "../components/ListGallery";
import LoadingPage from "../components/LoadingPage";

const PageHome = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);

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
        return (<main className="error-page">
            <h1>Something went wrong</h1>
            <p>We couldn’t load the application.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </main>)
    }

    return (
        <main>
            <h1 className="screen-reader-text">ghostlyDB</h1>
            <HomeHeroSlider popularArray={popular} />

            <ListGallery movieArray={upcoming} title="Upcoming" id="upcoming" />
            <ListGallery movieArray={popular} title="Popular" id="popular" />
            <ListGallery movieArray={nowPlaying} title="Now Playing" id="nowPlaying" />
            <ListGallery movieArray={topRated} title="Top Rated" id="topRated" />


        </main>
    );

}

export default PageHome