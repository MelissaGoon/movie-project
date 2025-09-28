import Slider from "react-slick";
import MovieCard from "./MovieCard";
import { PrevArrow, NextArrow } from "./Arrows";
import { useMediaQuery } from "@uidotdev/usehooks";

const SimilarGallery = ({ movieArray }) => {

    const isBelow470 = useMediaQuery("only screen and (max-width: 470px)");
    const isBelow637 = useMediaQuery("only screen and (max-width: 637px)");
    const isBelow720 = useMediaQuery("only screen and (max-width: 720px)");
    const isBelow880 = useMediaQuery("only screen and (max-width: 880px)");
    const isBelow1060 = useMediaQuery("only screen and (max-width: 1060px)");
    const isBelow1230 = useMediaQuery("only screen and (max-width: 1230px)");

    // Decide slides based on breakpoints
    let slidesToShow = 6;
    let slidesToScroll = 6;

    if (isBelow470) {
        slidesToShow = slidesToScroll = 2;
    } else if (isBelow637) {
        slidesToShow = slidesToScroll = 3;
    } else if (isBelow720) {
        slidesToShow = slidesToScroll = 4;
    } else if (isBelow880) {
        slidesToShow = slidesToScroll = 3;
    } else if (isBelow1060) {
        slidesToShow = slidesToScroll = 4;
    } else if (isBelow1230) {
        slidesToShow = slidesToScroll = 5;
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        prevArrow: <PrevArrow additionalClass="arrowBtnSimilar" />,
        nextArrow: <NextArrow additionalClass="arrowBtnSimilar" />,
    };

    return (

        <Slider {...settings}>
            {
                movieArray.map((movie) => <MovieCard data={movie} />)
            }
        </Slider>

    )
}

export default SimilarGallery