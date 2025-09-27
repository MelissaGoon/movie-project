import Slider from "react-slick";
import MovieCard from "./MovieCard";
import { PrevArrow, NextArrow } from "./Arrows";

const SimilarGallery = ({ movieArray }) => {

    // TODO: implement responsive
    //  https://react-slick.neostack.com/docs/example/responsive
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: <PrevArrow additionalClass="arrowBtnSimilar" />,
        nextArrow: <NextArrow additionalClass="arrowBtnSimilar" />,
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 1060,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 637,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
        ]
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