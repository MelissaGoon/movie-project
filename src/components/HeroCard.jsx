import styles from '../styles/modules/HeroCard.module.css';
import MovieInfo from './MovieInfo';
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const HeroCard = ({ data }) => {
    let navigate = useNavigate();
    const config = useConfig();

    const image_base_url = config.images.base_url;
    const image_size = config.images.poster_sizes[5];


    const handleBtnClick = () => {
        navigate({
            pathname: `/movie/${data.id}`
        });
    }

    return (
        <article className={styles.card}>

            <img className={styles.poster} src={`${image_base_url}${image_size}${data.poster_path}`} alt={`Poster for ${data.title}`} />

            <div className='slide-right'>
                <MovieInfo styles={styles} data={data} />

                <Button text="See More" classes="border-cream" onClick={handleBtnClick} />
            </div>
        </article>
    )
}

export default HeroCard