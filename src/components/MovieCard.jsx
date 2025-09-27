import styles from '../styles/modules/MovieCard.module.css';
import { useConfig } from '../context/ConfigContext';

import Button from './Button';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';
import Poster from './Poster';
import { isSaved } from '../globals/global-utils';
import { useListContext } from '../context/ListContext';

const MovieCard = ({ data }) => {
    const config = useConfig();
    let navigate = useNavigate();
    const { list, addToList, removeFromList } = useListContext()
    let saved = isSaved(list, data.id);


    // Excludes collections
    if (data.vote_average == null) {
        return "";
    }

    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const image_size = config.images.poster_sizes[5];

    const handleSeeMore = () => {
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
        <article className={styles.card + (saved ? ` ${styles.saved}` : "")}>
            <Poster styles={styles} data={data} image_size={image_size} />


            <button className={styles.save_btn} onClick={() => handleSaveClick(data)}>
                {saved ?
                    <><svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M3.45691 4.22414C3.45691 3.54806 4.00497 3 4.68105 3H29.7759C30.4519 3 31 3.54807 31 4.22414V37.051C31 38.1846 29.592 38.7092 28.8502 37.852L17.2285 24.4224L5.6067 37.852C4.86488 38.7092 3.45691 38.1846 3.45691 37.051V4.22414Z" fill="#A30D0B" stroke="#A30D0B" strokeWidth="5.50862" />
                    </svg>
                        <span className='screen-reader-text'>Remove From List</span> </> :
                    <>
                        <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M3 4.22414C3 3.54806 3.54807 3 4.22414 3H29.319C29.995 3 30.5431 3.54807 30.5431 4.22414V37.051C30.5431 38.1846 29.1351 38.7092 28.3933 37.852L16.7716 24.4224L5.14979 37.852C4.40797 38.7092 3 38.1846 3 37.051V4.22414Z" stroke="#A30D0B" strokeWidth="5.50862" />
                        </svg>
                        <span className='screen-reader-text'>Save to List</span>
                    </>}
            </button>

            <section className={styles.body_content}>
                <h3>{data.title}</h3>
                <p>{data.release_date}</p>
                <Rating vote_average={data.vote_average} vote_count={data.vote_count} styles={styles} saved={saved} />

                <p className={styles.overview}>{data.overview}</p>

                <Button className={styles.btn} classes={"small" + (saved ? " body-cream" : "")} onClick={handleSeeMore} text="See More" />

            </section>
        </article>
    )

}

export default MovieCard