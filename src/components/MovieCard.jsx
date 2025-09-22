import styles from '../styles/modules/MovieCard.module.css';
import { useConfig } from '../context/ConfigContext';
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import Button from './Button';

const MovieCard = ({ data }) => {
    const config = useConfig();

    const image_base_url = config.images.base_url;

    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const image_size = config.images.poster_sizes[5];

    const handleSeeMore = () => {
        console.log("See more");
    }

    return (
        <article className={styles.card}>
            <img className={styles.poster} src={`${image_base_url}${image_size}${data.poster_path}`} alt={`Poster for ${data.title}`} />
            {/* <div className="btn-favourite">
                {isFav ?
                    <button onClick={() => handleFavClick(kittenOb, true)} >Remove from Favs</button>
                    :
                    <button onClick={() => handleFavClick(kittenOb, false)}>Add to Favs</button>
                }
            </div> */}


            <section className={styles.body_content}>
                <h3>{data.title}</h3>

                <div className={styles.rating}>
                    <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />
                    <p>{data.vote_average.toFixed(2)}</p>
                </div>

                <p>{data.overview}</p>

                <Button classes="small" onClick={handleSeeMore} text="See More" />

            </section>
        </article>
    )

    // Mobile card
    //    <a className={styles.card}>
    //         <img className={styles.poster} src={`${image_base_url}${image_size}${data.poster_path}`} alt={`Poster for ${data.title}`} />
    //         {/* <div className="btn-favourite">
    //             {isFav ?
    //                 <button onClick={() => handleFavClick(kittenOb, true)} >Remove from Favs</button>
    //                 :
    //                 <button onClick={() => handleFavClick(kittenOb, false)}>Add to Favs</button>
    //             }
    //         </div> */}


    //         <section className={styles.body_content}>
    //             <h3>{data.title}</h3>

    //             <div className={styles.rating}>
    //                 <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />
    //                 <p>{data.vote_average.toFixed(2)}</p>
    //             </div>

    //         </section>
    //     </a>
}

export default MovieCard