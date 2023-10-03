import { Box, Flex, Text, Image, Button, Icon, Circle, SkeletonCircle, Heading } from '@chakra-ui/react';
import { faCreditCard, faFighterJet, faPause, faPauseCircle, faPlane, faPlay, faPrayingHands, faRocket, faSpaceShuttle, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/PlayListMusics.css'
import "../css/Main.css"
import { useEffect, useRef, useState } from 'react';
import { usePlayList } from './customs/usePlayList';
import baseImg from '../img/base_image2.jpg'
import MusicVisualizer from './customs/MusicVisualizer';
import ColorThief from 'colorthief';

const PlayListMusics = ({loading}) => {
  const [isHovered, setIsHovered] = useState(false);
  const {selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic} = usePlayList();
  const [isSelectedMusicPlaying, setIsSelectedMusicPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    if(loading){
      const img = document.getElementById('music_img');
      const colorThief = new ColorThief();
      img.onload = () => {
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      };
    }
  }, []);

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
    <Box className='main-container' pt={70}>

      {/* 플레이리스트 정보 */}
      {/* <Flex alignItems="center" mb={4}>
        <Image src={playlistData.imageUrl} alt={playlistData.name} boxSize="100px" />
        <Box ml={4}>
          <Text fontWeight="bold" fontSize="xl">
            {playlistData.name}
          </Text>
          <Text fontSize="sm">{playlistData.description}</Text>
        </Box>
      </Flex> */}

      <Flex alignItems="center" mb={4} flexShrink="0">
        <Image className='music_img' src={baseImg} w="30%"  minW="100px"/>
        <Box ml={4}>
          <Text className="font_white" fontWeight="bold" fontSize="xl" style={{ wordWrap: "break-word" }}>
            {selectedMusic.title}
          </Text>
          <Text className='font_gray' fontSize="sm" style={{ wordWrap: "break-word" }}>{selectedMusic.artist}</Text>
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
          <MusicVisualizer width={800} height={100}></MusicVisualizer>
      </Box>

      {/* <Heading>아래의 색 코드는 {bgColor}</Heading> */}
      <Box w='100%' h="1px" mb="30px" style={{ backgroundColor: bgColor }}></Box>

      {/* 노래 목록 */}
      {playlistData.tracks.map((track, index) => (
        <Flex key={index} alignItems="center" mb={2} w="100%" className='playListMusicsItem'       
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
  );
};

export default PlayListMusics;
