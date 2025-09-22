import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import { useConfig } from '../context/ConfigContext';
import { getWritingCredits, getDirector, getAgeRating, getRuntime } from '../globals/global-utils';
/**
 * Displays the information of a movie
 * 
 * styles: Custom styling passed in from parent component
 * data: Movie data object from TMDB API from either an entry from the array produced by fetchMovies() or from fetchSingleMovie()
 * details: Boolean indicating if data is detailed (from fetchSingleMovie()) or not (from fetchMovies() array item)
 *
 */
const MovieInfo = ({ styles, data, details }) => {
    const config = useConfig();

    const genre_map = config.genres;
    const writingCredits = details ? getWritingCredits(data) : null;
    const directingCredits = details ? getDirector(data) : null
    const ageRating = details ? getAgeRating(data) : "";
    const runtime = details ? getRuntime(data) : "";

    return (

        <div className={styles.card_text}>

            <h2>{data.title}</h2>


            <div className={styles.miscDetails}>
                {details && <p className={styles.ageRating}>{ageRating}</p>}
                <p>{data.release_date}</p>
            </div>

            {details && <p>{runtime}</p>}


            <div className={styles.genres}>
                {
                    !details ?
                        data.genre_ids.map((id) => {
                            let genreObj = genre_map.find((element) => element.id === id);
                            return (<p key={genreObj.id}>{genreObj.name}</p>)
                        }) :
                        data.genres.map((genre) => <p key={genre.id}>{genre.name}</p>)
                }

            </div>

            <div className={styles.rating}>
                <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />
                <p>{data.vote_average.toFixed(2)}</p>
            </div>

            {details && <div className={styles.crew}>
                {directingCredits && Object.entries(directingCredits).map(([job, names]) => (
                    <p key={job}>
                        <strong>{job}:</strong> {names.join(", ")}
                    </p>
                ))}
                {writingCredits && Object.entries(writingCredits).map(([job, names]) => (
                    <p key={job}>
                        <strong>{job}:</strong> {names.join(", ")}
                    </p>
                ))}

            </div>}

            {!details && <p>{data.overview}</p>}
        </div>


    )
}

export default MovieInfo