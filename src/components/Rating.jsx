import { ASSETS_FOLDER_PATH } from "../globals/global-variables"

const Rating = ({ styles, vote_average, vote_count, saved }) => {

    if (vote_count == 0) {
        return (
            <div className={styles.rating}>
                {saved ? <img src={`${ASSETS_FOLDER_PATH}cream-star.svg`} alt="A cream star icon" /> :
                    <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />}
                <p>No Ratings</p>
            </div>
        )
    }

    return (
        <div className={styles.rating}>
            {saved ? <img src={`${ASSETS_FOLDER_PATH}cream-star.svg`} alt="A cream star icon" /> :
                <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />}
            <p>{vote_average.toFixed(2)}</p>
        </div>
    )
}

export default Rating