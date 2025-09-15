import Slider from "react-slick";
import HeroCard from "./HeroCard";
import styles from '../styles/modules/HeroSlider.module.css';

const HomeHeroSlider = () => {
    // TODO: set to fade? and use https://react-slick.neostack.com/docs/example/slide-change-hooks 
    // to implement bg change
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={styles.slider_container} >
            <Slider {...settings}>
                <HeroCard />
                <HeroCard />
                <HeroCard />
            </Slider>
        </div>
    )
}

export default HomeHeroSlider