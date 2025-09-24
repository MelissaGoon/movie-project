import styles from '../styles/modules/ListPage.module.css';
import { useListContext } from "../context/ListContext"
import { useConfig } from '../context/ConfigContext';
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';
import MovieCard from '../components/MovieCard';
import ErrorPage from '../components/ErrorPage';

const PageList = () => {
    const config = useConfig();
    const { list } = useListContext();
    // TODO: sorting if you have the time :/ just by date and name
    // const listCopy = [...list];

    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const backdrop_size = config.images.backdrop_sizes[3];
    return (
        <main id="site-main">
            <section className={styles.hero}
                style={{
                    backgroundImage: `url(${list.length > 0 && list[0].backdrop_path ?
                        `${image_base_url}${backdrop_size}${list[0].backdrop_path}`
                        : `${ASSETS_FOLDER_PATH}placeholder-background.svg`
                        })`
                }}
            >
                <h1>My List</h1>

            </section>

            {list.length > 0 ?
                <div className={styles.saved_gallery}>
                    {list.map(item => <MovieCard key={item.id} data={item} />)}
                </div> :
                <ErrorPage text="No saved movies" error_msg="You haven't saved any movies yet! Check out our homepage to discover more 👻" />}


        </main>
    )
}

export default PageList