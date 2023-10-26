import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Slideshow.css"
import { Box, Heading, Image } from "@chakra-ui/react";

const Slideshow = ({ mostViewedMusicList }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 50000,
    autoplaySpeed: 0,
    cssEase: "linear",
    variableWidth: false,
    touchMove: false,
    arrows: false, // 이전 및 다음 버튼 숨김
    pauseOnHover: true,
  };

  return (
    <Box className="slideshow-container" m='30px'>
      <Box><Heading pb={1} fontSize={28} color={"gray.300"}>Most Played Musics</Heading></Box>
      <Box ml='20px'>
        <Slider {...settings}>
          {mostViewedMusicList.map((music, index) => (
            <Box key={index}>
              <Image w="300px" className="imgs" src={music.img} alt={`Slide ${index + 1}`} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>

  );
};

export default Slideshow;
