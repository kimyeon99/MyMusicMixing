import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Center, Heading, Img } from "@chakra-ui/react";

const TrackList = () => {
    const images = [
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_478844a2-cb06-4acd-b31b-b01ff68e5b8c.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_3c488084-2efc-468a-9846-dc1a4ece3d2d.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',
        'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',

        // 추가 이미지 URL 추가
    ];

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: false,
        cssEase: "linear",
        arrows: false,
    };

    return (
        <Box className="track-container" pb={10} m='30px'>
            <Box><Heading pb={1} fontSize={28} color={"gray.300"}>요즘 인기있는 플레이리스트</Heading></Box>
            <Box ml='20px'>
                <Slider {...settings}>
                    {images.map((imageUrl, index) => (
                        <Box key={index}>
                            <Img w="100%" className="imgs" src={imageUrl} alt={`Slide ${index + 1}`} />
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
}

export default TrackList;