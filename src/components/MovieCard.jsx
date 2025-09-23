import styles from '../styles/modules/MovieCard.module.css';
import { useConfig } from '../context/ConfigContext';
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';
import Poster from './Poster';

const MovieCard = ({ data }) => {
    const config = useConfig();
    let navigate = useNavigate();

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

    return (
        <article className={styles.card}>
            <Poster styles={styles} data={data} image_size={image_size} />
            {/* <div className="btn-favourite">
                {isFav ?
                    <button onClick={() => handleFavClick(kittenOb, true)} >Remove from Favs</button>
                    :
                    <button onClick={() => handleFavClick(kittenOb, false)}>Add to Favs</button>
                }
            </div> */}


            <section className={styles.body_content}>
                <h3>{data.title}</h3>
                <p>{data.release_date}</p>
                <Rating vote_average={data.vote_average} vote_count={data.vote_count} styles={styles} />

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

    //             <Rating vote_average={data.vote_average} vote_count={data.vote_count} styles={styles} />

    //         </section>
    //     </a>
}

export default MovieCard