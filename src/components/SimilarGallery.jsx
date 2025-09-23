import Slider from "react-slick";
import MovieCard from "./MovieCard";

const SimilarGallery = ({ movieArray }) => {

    // TODO: implement responsive
    //  https://react-slick.neostack.com/docs/example/responsive
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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