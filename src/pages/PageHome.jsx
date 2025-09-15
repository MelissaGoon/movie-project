import { useEffect } from "react";
import { fetchMovies } from "../globals/global-utils";

const PageHome = () => {



    useEffect(() => {
        fetchMovies("now_playing");
    }, []);

    return (
        <main> <div>PageHome</div></main>
    )
}

export default PageHome