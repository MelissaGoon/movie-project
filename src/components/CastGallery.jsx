import Slider from "react-slick";
import { useConfig } from '../context/ConfigContext';
import CastItem from "./CastItem";
import { ASSETS_FOLDER_PATH } from "../globals/global-variables";

const CastGallery = ({ data }) => {
    const config = useConfig();
    const castArray = data.credits.cast;

    // TODO: implement responsive
    //  https://react-slick.neostack.com/docs/example/responsive
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };



    const image_base_url = config.images.base_url;
    // TODO: implement use media query to get the retreived image sizes dynamically  
    //  const isMobile = useMediaQuery({ maxWidth: 767 });
    const profile_size = config.images.profile_sizes[1];
    return (
        <Slider {...settings}>
            {
                castArray.map((castMember) => {
                    let imageURL = castMember.profile_path ? `${image_base_url}${profile_size}${castMember.profile_path}` : `${ASSETS_FOLDER_PATH}profile-not-found.svg`;
                    return (<CastItem key={castMember.id} name={castMember.name} role={castMember.character}
                        imageURL={imageURL} />)
                })
            }
        </Slider>
    )
}

export default CastGallery