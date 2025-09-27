import { ASSETS_FOLDER_PATH } from "../globals/global-variables";
import styles from '../styles/modules/About.module.css';
import heroStyles from '../styles/modules/SingleMovie.module.css';
import { APP_TITLE } from "../globals/global-variables";
import { useEffect } from "react";

const PageAbout = () => {

    useEffect(() => {
        document.title = `${APP_TITLE} | About`
    }, [])

    return (
        <main id="site-main">
            <section className={heroStyles.hero}>

                <img src={`${ASSETS_FOLDER_PATH}placeholder-background.svg`} alt="A repeating pattern of a cartoon ghost with sunglasses on." />


                <div className={heroStyles.hero_text}>
                    <h1 className={styles.title}>👻 About Us 👻</h1>

                </div>
            </section>

            <section className={styles.info}>
                <h2>What is ghostlyDB?</h2>
                <p>GhostlyDB is a simple, clean movie database powered by The Movie Database (TMDb) API. Browse, search, and discover films from every genre, guided by our friendly ghost mascot. Built as a passion project, GhostlyDB offers a lightweight, easy-to-use space for movie lovers to explore cinema both classic and new.</p>
                <img className={styles.ghost_logo} src={`${ASSETS_FOLDER_PATH}logo-ghost.svg`} alt="The ghostlyDB Logo" />
                <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                <img className={styles.tmdb_logo} src={`${ASSETS_FOLDER_PATH}tmdb_logo.svg`} alt="The TMDB Logo" />
            </section>

        </main>
    )
}

export default PageAbout