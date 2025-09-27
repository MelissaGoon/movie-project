import Slider from "react-slick";
import { useConfig } from '../context/ConfigContext';
import CastItem from "./CastItem";
import { ASSETS_FOLDER_PATH } from "../globals/global-variables";
import styles from '../styles/modules/CastGallery.module.css';
import { PrevArrow, NextArrow } from "./Arrows";

const CastGallery = ({ data }) => {
    const config = useConfig();
    const castArray = data.credits.cast;

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        prevArrow: <PrevArrow additionalClass="arrowBtnCast" />,
        nextArrow: <NextArrow additionalClass="arrowBtnCast" />,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };



    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const profile_size = config.images.profile_sizes[1];
    return (
        <div className={styles.slider_container}>
            <Slider {...settings}>
                {
                    castArray.map((castMember) => {
                        let imageURL = castMember.profile_path ? `${image_base_url}${profile_size}${castMember.profile_path}` : `${ASSETS_FOLDER_PATH}image-not-found.svg`;
                        return (<CastItem className={styles.cast_member} key={castMember.id} name={castMember.name} role={castMember.character}
                            imageURL={imageURL} />)
                    })
                }
            </Slider>
        </div>
    )
}

export default CastGallery