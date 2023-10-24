import { Box, Flex, Text, Image, Button, Icon, Circle, SkeletonCircle, Heading, Center } from '@chakra-ui/react';
import { faCreditCard, faFighterJet, faPause, faPauseCircle, faPlane, faPlay, faPrayingHands, faRocket, faSpaceShuttle, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/PlayListMusics.css'
import "../css/Main.css"
import { useEffect, useRef, useState } from 'react';
import { usePlayList } from './customs/usePlayList';
import baseImg2 from '../img/base_image2.jpg';
import baseImg3 from '../img/base_image3.jpg';
import baseImg4 from '../img/base_image4.jpg';
import baseImg5 from '../img/base_image5.jpg';
import baseImg6 from '../img/base_image5.webp';
import baseImg7 from '../img/base_image7.jpg';
import baseImg8 from '../img/base_image8.jpg';

import MusicVisualizer from './customs/MusicVisualizer';
import ColorThief from 'colorthief';
import convert from 'color-convert';
import { dblClick } from '@testing-library/user-event/dist/click';
import Sketch from './Sketch';


const PlayListMusics = ({loading}) => {
  const [isHovered, setIsHovered] = useState(false);
  const {selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic} = usePlayList();
  const [isSelectedMusicPlaying, setIsSelectedMusicPlaying] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const [dBgColor, setDBgColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (!loading) {
      const images = [baseImg2, baseImg3, baseImg4, baseImg5, baseImg6, baseImg7, baseImg8];
      //const images = [baseImg8];
      const randomIndex = Math.floor(Math.random() * images.length);
      setSelectedImage(images[randomIndex]);

      const img = document.getElementById('music_img');
      const colorThief = new ColorThief();

      const MaxBightness = 65;
      const MaxDarkBightness = 65;
      const Minbrightness = 40;
      const MinDarkbrightness = 40;
      // const Minbrightness = 40;
      // const MinDarkbrightness = 15;
      img.onload = () => {
        const color = colorThief.getColor(img);
        // setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);

        // ColorThief가 반환한 RGB 값
        const rgb = [color[0], color[1], color[2]];

        // RGB에서 HSL로 변환
        let hsl = convert.rgb.hsl(rgb);
        let hsl2 = convert.rgb.hsl(rgb);
        console.log(`hsl2 = ${hsl2[2]}`);

        if (hsl2[2] < Minbrightness) {
          hsl2[2] = Minbrightness;
          hsl2[0] += -5;
          hsl[0] += -5;
          hsl2[1] += 20;
          hsl[1] += 20;
          hsl[2] = MinDarkbrightness;
        } else if (hsl2[2] > MaxBightness) {
          hsl2[2] = MaxBightness;
          hsl[2] = MaxDarkBightness;
          console.log(`hsl2 = ${hsl2[2]}`);
        }

        // 1= 채도, 2 = 밝기
        setBgColor(`hsl(${hsl2[0]}, ${hsl2[1]}%, ${hsl2[2]}%)`);
        setDBgColor(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
      }
    };
  }, [loading, selectedImage]);

  function brightness(rgb) {
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const playlistData = {
    name: 'My Awesome Playlist',
    description: 'Some cool songs to listen to',
    imageUrl: 'https://via.placeholder.com/150', // 플레이리스트 이미지 URL
    tracks: [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 4',
        artist: 'Artist 4',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 5',
        artist: 'Artist 5',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 6',
        artist: 'Artist 6',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 7',
        artist: 'Artist 7',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 8',
        artist: 'Artist 8',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 9',
        artist: 'Artist 9',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
      {
        title: 'Song 10',
        artist: 'Artist 10',
        imageUrl: 'https://via.placeholder.com/150', // 노래 이미지 URL
      },
    ],
  };

  function handlePlayMusic(){
    playToggleHandler();
  }

  return (
    // style={{ background: `linear-gradient(to bottom, ${bgColor}, #000)` }}
<Box className='main-container' pt={3} position={'relative'} height='100%'>
    
    <Box w={'100%'} h={'55%'} ></Box>
    <Box 
      width='100%'
      height='90%'
      style={{ background: `linear-gradient(to bottom,
        ${dBgColor} 50%,
        rgba(0,0,0,.5) 100%)`,
       }}
      position='absolute'
      top='0%'
      >
      
      <Flex position="relative" alignItems="center" color="white" p={10} mt={10}>
        <Box 
          position="absolute"
          top={0}
          left={0}
          width='100%'
          height='100%'
          style={{ background: `-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.2))), ${bgColor}`}}
        />
        
        <Box ml={4} maxW="300px" minW="100px" shadow="dark-lg" zIndex={9999} backgroundColor='transparent'>
            <Image id='music_img' src={selectedImage} w="100%" />
        </Box>

        <Box ml={4}>
            <Text className="font_white" fontWeight="bold" fontSize="xl" style={{ wordWrap: "break-word"}}>
                {selectedMusic.title}
            </Text>
            <Text className='font_gray' fontSize="sm" style={{ wordWrap: "break-word"}}>{selectedMusic.artist}</Text>
        </Box>
      </Flex>


        <Box>
          {playingMusic == selectedMusic && isPlaying ? (
            <Button w={50} h={50} m={2} mb={10} onClick={handlePlayMusic} colorScheme='gray' style={{ borderRadius: "100%" }}>
              <FontAwesomeIcon icon={faPause} size="xl" className="pulse-slow-animation"/>
              {/* className="slow-bounce-animation" */}
            </Button>
          ) : (
            <Button w={50} h={50} m={2} mb={10} onClick={handlePlayMusic} colorScheme='blue' style={{ borderRadius: "100%" }}>
              <FontAwesomeIcon icon={faPlay} size='xl' className='move-animation'/>
            </Button>
          )}
          {/* <MusicVisualizer width={'100%'} height={100}></MusicVisualizer> */}
        </Box>

        <Sketch analyser={playingMusic ? playingMusic.analyserNode : null} />


        {playlistData.tracks.map((track, index) => (
        <Flex  ml={5} key={index} alignItems="center" mb={2} w="80%" className='playListMusicsItem'       
        _hover={{
            cursor: "pointer",
            filter: "blur(0.4px)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {isHovered && (
            <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            
            >
              <FontAwesomeIcon icon={faPlay} size='lg' beat/>
            </Box>
        )}
          <Image src={track.imageUrl} alt={track.title} boxSize="60px" />
          <Box ml={2}>
            <Text className='font_white' fontWeight="bold">{track.title}</Text>
            <Text className='font_gray' fontSize="sm">{track.artist}</Text>
          </Box>
          <Button
            ml="auto"
            rightIcon={<FontAwesomeIcon icon={faPlay}/>}
            colorScheme="purple"
            variant="ghost"
            size="sm"
            onClick={handlePlayMusic}
          >
            Play
          </Button>
        </Flex>
      ))}
    </Box>
</Box>
    
  );
};

export default PlayListMusics;
