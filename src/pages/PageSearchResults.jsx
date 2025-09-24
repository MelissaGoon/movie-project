import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchSearchMovies } from "../globals/global-utils";
import styles from '../styles/modules/SearchResults.module.css';
import { Link } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import LoadingPage from "../components/LoadingPage";
const PageSearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


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
        <main id="site-main">
            <h1>Search results for: <span className="capitalize">{query}</span></h1>

            <div className={styles.result_gallery}> {results.map(item => <MovieCard key={item.id} data={item} />)}</div>
        </main >
    )
}

export default PageSearchResults