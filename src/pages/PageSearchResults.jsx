import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchSearchMovies } from "../globals/global-utils";
import styles from '../styles/modules/SearchResults.module.css';
import stylesGallery from '../styles/modules/ListPage.module.css';
import ErrorPage from "../components/ErrorPage";
import LoadingPage from "../components/LoadingPage";
import { APP_TITLE } from "../globals/global-variables";

const PageSearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = `${APP_TITLE} | Search`
    }, [])


    useEffect(() => {
        async function loadSearchResults() {
            try {
                const searchRes = await fetchSearchMovies(query);
                setResults(searchRes);
            } catch (err) {
                setError(err.message || "Error loading results, please try again later.");
            } finally {
                setLoading(false);
            }

        };
        loadSearchResults();
    }, [query]);

    if (loading) {
        return (<LoadingPage text="Loading results..." />);
    }

    if (error) {
        return (<ErrorPage text="Something went wrong..." error_msg={error} />)
    }

    if (results.length == 0) {
        return (<ErrorPage text="Hmm, we couldn't find anything matching your search..." />)
    }

    console.log(results);
    return (
        <main id="site-main" >
            <div className={styles.search_body}>
                <h1>Search results for: <span className="capitalize">{query}</span></h1>

                <div className={stylesGallery.movie_gallery}> {results.map(item => <MovieCard key={item.id} data={item} />)}</div>
            </div>
        </main >
    )
}

export default PageSearchResults