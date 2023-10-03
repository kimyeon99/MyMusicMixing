import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Slideshow.css"
import { Box, Heading } from "@chakra-ui/react";

export default class Slideshow extends Component {
  render() {

    const images = [
      'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_478844a2-cb06-4acd-b31b-b01ff68e5b8c.webp',
      'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_3c488084-2efc-468a-9846-dc1a4ece3d2d.webp',
      'https://storage.googleapis.com/studio-design-asset-files/projects/AXq19b11q7/s-1196x840_v-fs_webp_e287447d-cfee-44b4-93b7-b05541c3833f.webp',
      // 추가 이미지 URL 추가
    ];

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
      <div className="slideshow-container" style={{width:'90%'}}>
        <Box><Heading pb={1} fontSize={28} color={"gray.300"}>가장 많이 재생된 노래</Heading></Box>
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img className="imgs" src={imageUrl} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}