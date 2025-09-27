import styles from '../styles/modules/ListPage.module.css';
import { useListContext } from "../context/ListContext"
import { useConfig } from '../context/ConfigContext';
import { ASSETS_FOLDER_PATH, APP_TITLE } from '../globals/global-variables';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroStyles from '../styles/modules/SingleMovie.module.css';
import { useMediaQuery } from '@uidotdev/usehooks';


const PageList = () => {
    const config = useConfig();
    const { list } = useListContext();

    const [bgLoaded, setBgLoaded] = useState(false);
    const image_base_url = config.images.base_url;
    const largerScreen = useMediaQuery(
        "only screen and (min-width : 720px)"
    );

    const backdrop_size = largerScreen ? config.images.backdrop_sizes[3] : config.images.backdrop_sizes[1];

    useEffect(() => {
        document.title = `${APP_TITLE} | My List`
    }, [])


    const handleBgLoad = () => {
        setBgLoaded(true);
    }

    return (
        <main id="site-main">
            <section className={heroStyles.hero}>

                {!bgLoaded && <img src={`${ASSETS_FOLDER_PATH}placeholder-background.svg`} alt="A placeholder backdrop" />}

                <img src={list.length > 0 && list[0].backdrop_path ? `${image_base_url}${backdrop_size}${list[0].backdrop_path}`
                    : `${ASSETS_FOLDER_PATH}placeholder-background.svg`}
                    alt="" onLoad={handleBgLoad} className={`fade_in ${bgLoaded ? "loaded" : ""}`} />
                <h1 className={styles.title}>My List</h1>

            </section>

            {list.length > 0 ?
                <div className={styles.movie_gallery}>
                    {list.map(item => <MovieCard key={item.id} data={item} />)}
                </div> :
                <section className={styles.empty}>
                    <h2>No saved movies</h2>
                    <p>You haven't saved any movies yet! Check out our homepage to discover more 👻</p>
                    <Link to="/"> Go Home </Link>
                </section>}


        </main>
    )
}

export default PageList