import Slider from "react-slick";
import { useConfig } from '../context/ConfigContext';
import CastItem from "./CastItem";
import { ASSETS_FOLDER_PATH } from "../globals/global-variables";
import styles from '../styles/modules/CastGallery.module.css';
import { PrevArrow, NextArrow } from "./Arrows";
import { useMediaQuery } from "@uidotdev/usehooks";

const CastGallery = ({ data }) => {
    const config = useConfig();
    const castArray = data.credits.cast;
    const isBelow380 = useMediaQuery("only screen and (max-width: 380px)");
    const isBelow560 = useMediaQuery("only screen and (max-width: 560px)");
    const isBelow780 = useMediaQuery("only screen and (max-width: 780px)");
    const isBelow900 = useMediaQuery("only screen and (max-width: 900px)");
    const isBelow1150 = useMediaQuery("only screen and (max-width: 1150px)");


    let slidesToShow = 8;
    let slidesToScroll = 8;

    if (isBelow380) {
        slidesToShow = slidesToScroll = 2;
    } else if (isBelow560) {
        slidesToShow = slidesToScroll = 3;
    } else if (isBelow780) {
        slidesToShow = slidesToScroll = 4;
    } else if (isBelow900) {
        slidesToShow = slidesToScroll = 5;
    } else if (isBelow1150) {
        slidesToShow = slidesToScroll = 6;
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        prevArrow: <PrevArrow additionalClass="arrowBtnCast" />,
        nextArrow: <NextArrow additionalClass="arrowBtnCast" />,
    };



    const image_base_url = config.images.base_url;
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