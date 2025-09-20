import { BASE_URL_MOVIES } from "./global-variables";
const API_KEY = import.meta.env.VITE_API_KEY;


// Fetch list of movies by section
export const fetchMovies = async (section) => {
    try {
        const response = await fetch(`${BASE_URL_MOVIES}/${section}?api_key=${API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.results || [];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

// Fetch similar movies


// Fetch single movie
export const fetchSingleMovie = async (id) => {
    try {
        const response = await fetch(`${BASE_URL_MOVIES}/${id}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data || null;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

