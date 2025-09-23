import { ASSETS_FOLDER_PATH } from "../globals/global-variables"
import { useConfig } from "../context/ConfigContext";

const Poster = ({ styles, data, image_size }) => {
    const config = useConfig();

    const image_base_url = config.images.base_url;
    return (
        <img className={styles.poster} src={data.poster_path ? `${image_base_url}${image_size}${data.poster_path}`
            : `${ASSETS_FOLDER_PATH}image-not-found.svg`}
            alt={`Poster for ${data.title}`} />
    )
}

export default Poster