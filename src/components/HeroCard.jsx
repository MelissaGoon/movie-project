import styles from '../styles/modules/HeroCard.module.css';
import MovieInfo from './MovieInfo';
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Poster from './Poster';

const HeroCard = ({ data }) => {
    let navigate = useNavigate();
    const config = useConfig();

    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const image_size = config.images.poster_sizes[5];


    const handleBtnClick = () => {
        navigate({
            pathname: `/movie/${data.id}`
        });
    }

    return (
        <article className={styles.card}>

            <Poster styles={styles} data={data} image_size={image_size} />
            <div className='slide-right'>
                <MovieInfo styles={styles} data={data} details={false} />

                <Button text="See More" classes="border-cream" onClick={handleBtnClick} />
            </div>
        </article>
    )
}

export default HeroCard