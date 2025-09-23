import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchSearchMovies } from "../globals/global-utils";
import styles from '../styles/modules/SearchResults.module.css';
import { Link } from "react-router-dom";
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
        return (<main className="loading-page">
            <h1>Loading results...</h1>
            <div className="loader"></div>
        </main>);
    }

    if (error) {
        return (<main className="error-page">
            <h1>Something went wrong...</h1>
            <p>{error}</p>
            <Link to="/"> Go Home </Link>
        </main>)
    }

    if (results.length == 0) {
        return (<main className="error-page">
            <h1>Hmm, we couldn't find anything matching your search...</h1>
            <Link to="/"> Go Home </Link>
        </main>)
    }

    return (
        <main>
            <h1>Search results for: <span className="capitalize">{query}</span></h1>

            <div className={styles.result_gallery}> {results.map(item => <MovieCard key={item.id} data={item} />)}</div>
        </main >
    )
}

export default PageSearchResults