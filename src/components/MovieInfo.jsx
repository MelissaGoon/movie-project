import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import { useConfig } from '../context/ConfigContext';

const MovieInfo = ({ styles, data }) => {
    const config = useConfig();

    const genre_map = config.genres;
    return (
        <article className={styles.card_text}>
            <h2>{data.title}</h2>

            <p>{data.release_date}</p>

            <div className={styles.genres}>
                {

                    data.genre_ids.map((id) => {
                        let genreObj = genre_map.find((element) => element.id === id);
                        return (<p key={genreObj.id}>{genreObj.name}</p>)
                    })
                }
            </div>

            <div className={styles.rating}>
                <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />
                <p>{data.vote_average.toFixed(2)}</p>
            </div>

            <p>{data.overview}</p>
        </article>

    )
}

export default MovieInfo