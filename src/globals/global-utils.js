import { BASE_URL_MOVIES } from "./global-variables";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (section) => {
    try {
        const response = await fetch(`${BASE_URL_MOVIES}/${section}?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        console.log(data.results);
    } catch (e) {
        console.error(e.message);
        // Error toast?

    }
}

// Fetch similar movies


// Fetch images


