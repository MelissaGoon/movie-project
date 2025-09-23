import Slider from "react-slick";
import MovieCard from "./MovieCard";

const ListGallery = ({ movieArray, title, id }) => {

    // TODO: implement responsive
    //  https://react-slick.neostack.com/docs/example/responsive
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };


    return (
        <section id={id}>
            <h2>{title}</h2>
            <Slider {...settings}>
                {
                    movieArray.map((movie) => <MovieCard data={movie} />)
                }
            </Slider>


        </section>
    )
}

export default ListGallery