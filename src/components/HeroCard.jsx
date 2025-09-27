import styles from '../styles/modules/HeroCard.module.css';
import MovieInfo from './MovieInfo';
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Poster from './Poster';
import { useListContext } from '../context/ListContext';
import { isSaved } from '../globals/global-utils';
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import { useMediaQuery } from '@uidotdev/usehooks';

const HeroCard = ({ data, slideNum }) => {
    let navigate = useNavigate();
    const config = useConfig();
    const { list, addToList, removeFromList } = useListContext();
    let saved = isSaved(list, data.id);

    const largerScreen = useMediaQuery(
        "only screen and (min-width : 720px)"
    );

    const image_size = largerScreen ? config.images.poster_sizes[5] : config.images.poster_sizes[2];


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
        <article className={styles.card} id={`slide-${slideNum}`}>

            <Poster styles={styles} data={data} image_size={image_size} />
            <div className={styles.card_right}>
                <MovieInfo styles={styles} data={data} details={false} />

                <div className={styles.button_container}>
                    {saved ? <Button text="Remove from List" onClick={() => handleSaveClick(data)} icon={`${ASSETS_FOLDER_PATH}saved-cream.svg`} /> :
                        <Button classes="body-cream border-red" text="Add to List" onClick={() => handleSaveClick(data)} icon={`${ASSETS_FOLDER_PATH}not-saved.svg`} />}
                    <Button text="See More" classes="border-cream" onClick={handleBtnClick} />
                </div>
            </div>
        </article>
    )
}

export default HeroCard