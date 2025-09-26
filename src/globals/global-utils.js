import { BASE_URL_MOVIES, BASE_URL_SEARCH_MOVIES } from "./global-variables";
const API_KEY = import.meta.env.VITE_API_KEY;


// Fetch list of 18 movies by section
export const fetchMovies = async (section) => {
    try {
        const response = await fetch(`${BASE_URL_MOVIES}/${section}?api_key=${API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.results.slice(0, 18) || [];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

// Fetch movies from a search query
export const fetchSearchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL_SEARCH_MOVIES}?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1`);
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

// Fetch single movie with release dates, credits and recommendations
export const fetchSingleMovie = async (id) => {
    try {
        const response = await fetch(`${BASE_URL_MOVIES}/${id}?append_to_response=release_dates%2Ccredits%2Crecommendations&api_key=${API_KEY}&language=en-US`);
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


// Get theatrical release age rating of movie from fetchSingleMovie() object, Canadian or if not found US, else return "NR"
export const getAgeRating = (data) => {
    const releaseDates = data.release_dates.results;

    const canada = releaseDates.find(dateInfo => dateInfo.iso_3166_1 === "CA");
    const us = releaseDates.find(dateInfo => dateInfo.iso_3166_1 === "US");

    // Look at canada first
    if (canada !== undefined) {
        // Find theatrical release
        const dateObjList = canada.release_dates.filter(d => d.type === 3);
        if (dateObjList != []) {
            // Return the first age rating found
            for (let i = 0; i < dateObjList.length; i++) {
                if (dateObjList[i].certification !== "") {
                    return `${dateObjList[i].certification} (CA)`;
                }
            }

        }
    }

    if (us !== undefined) {
        // Find theatrical release
        const dateObjList = us.release_dates.filter(d => d.type === 3);
        if (dateObjList != []) {
            // Return the first age rating found
            for (let i = 0; i < dateObjList.length; i++) {
                if (dateObjList[i].certification !== "") {
                    return `${dateObjList[i].certification} (US)`;
                }
            }

        }
    }


    return "NR";
}


// Get the director(s) of a movie from fetchSingleMovie() object
export const getDirector = (data) => {
    const crew = data.credits.crew;
    const directors = crew.filter(c => c.job === "Director");

    if (directors.length == 0) {
        return null;
    } else {
        return { Director: directors.map(member => member.name) }
    };
}

// Get a writing credit from a movie from fetchSingleMovie() object
export const getWritingCredits = (data) => {
    const crew = data.credits.crew;
    const writers = crew.filter(member => member.department === "Writing");

    if (writers.length === 0) {
        return null;
    }

    // Get people with job "Writer"
    let job = "Writer";
    let selected = writers.filter(member => member.job === job);

    // Else get people with job "Screenplay"
    if (selected.length === 0) {
        job = "Screenplay";
        selected = writers.filter(member => member.job === job);
    }

    // Else get a random writing credit
    if (selected.length === 0) {
        job = writers[0].job;
        selected = writers.filter(member => member.job === job);
    }

    return {
        [job]: selected.map(member => member.name)
    };
}

// Get a runtime in hours and minutes from a movie from fetchSingleMovie() object
export const getRuntime = (data) => {
    const runtimeMins = data.runtime;

    const hours = Math.floor(runtimeMins / 60);
    const mins = runtimeMins % 60;

    return `${hours}h ${mins}min`

}

// Returns if id is in list
export const isSaved = (list, id) => {
    if (list.length == 0) {
        return false;
    }

    return list.some(item => item.id == id);
}