import { useNavigate } from "react-router-dom";
const Search = () => {
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const movie = formData.get("movie").trim();

        if (movie !== "") {
            let encoded = encodeURIComponent(movie);

            navigate({
                pathname: "/search",
                search: `?q=${encoded}`,
            });
        }


    };

    return (
        <search>
            <form onSubmit={handleSubmit}>
                <label htmlFor="movie" className="screen-reader-text">Search Movies: </label>
                <input type="search" id="movie" name="movie" placeholder="Search Movies" />
                <button type="submit">Search</button>
            </form>
        </search>
    )
}

export default Search