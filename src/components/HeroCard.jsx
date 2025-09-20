import styles from '../styles/modules/HeroCard.module.css';
import MovieInfo from './MovieInfo';
import { useConfig } from '../context/ConfigContext';

const HeroCard = ({ data }) => {
    const config = useConfig();

    const image_base_url = config.images.base_url;
    const image_size = config.images.poster_sizes[5];

    return (
        <article className={styles.card}>

            <img className={styles.poster} src={`${image_base_url}${image_size}${data.poster_path}`} alt={`Poster for ${data.title}`} />

            <div className='slide-right'>
                <MovieInfo styles={styles} data={data} />

            </div>
        </article>
    )
}

export default HeroCard