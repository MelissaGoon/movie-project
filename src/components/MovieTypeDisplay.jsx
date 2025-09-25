import MovieCard from "./MovieCard";

const MovieTypeDisplay = ({ movieArray, title, styles }) => {
    return (
        <section >
            <h2>{title}</h2>
            <div className={styles.type_gallery}>
                {movieArray.map((movie) => <MovieCard data={movie} />)}
            </div>

        </section>
    )
}

export default MovieTypeDisplay