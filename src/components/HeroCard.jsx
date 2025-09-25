import styles from '../styles/modules/HeroCard.module.css';
import MovieInfo from './MovieInfo';
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Poster from './Poster';
import { useListContext } from '../context/ListContext';
import { isSaved } from '../globals/global-utils';
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';

const HeroCard = ({ data }) => {
    let navigate = useNavigate();
    const config = useConfig();
    const { list, addToList, removeFromList } = useListContext();
    let saved = isSaved(list, data.id);

    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const image_size = config.images.poster_sizes[5];


    const handleBtnClick = () => {
        navigate({
            pathname: `/movie/${data.id}`
        });
    }

    const handleSaveClick = (movieObj) => {
        if (saved) {
            removeFromList(movieObj);
        } else {
            addToList(movieObj);
        }
    }

    return (
        <article className={styles.card}>

            <Poster styles={styles} data={data} image_size={image_size} />
            <div className={styles.card_right}>
                <MovieInfo styles={styles} data={data} details={false} />

                <div className={styles.button_container}>
                    {saved ? <Button text="Remove from List" onClick={() => handleSaveClick(data)} icon={`${ASSETS_FOLDER_PATH}saved-cream.svg`} /> :
                        <Button classes="body-cream" text="Add to List" onClick={() => handleSaveClick(data)} icon={`${ASSETS_FOLDER_PATH}not-saved.svg`} />}
                    <Button text="See More" classes="border-cream" onClick={handleBtnClick} />
                </div>
            </div>
        </article>
    )
}

export default HeroCard