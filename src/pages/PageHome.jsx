import { useEffect } from "react";
import { fetchMovies } from "../globals/global-utils";
import HomeHeroSlider from "../components/HomeHeroSlider";
const PageHome = () => {



    useEffect(() => {
        // fetchMovies("now_playing");
    }, []);

    return (
        <main> <div>PageHome</div>
            <HomeHeroSlider />
        </main>
    )
}

export default PageHome