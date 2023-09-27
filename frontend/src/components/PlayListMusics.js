import { Box, Flex, Text, Image, Button, Icon, Circle, SkeletonCircle } from '@chakra-ui/react';
import { faCreditCard, faFighterJet, faPause, faPauseCircle, faPlane, faPlay, faPrayingHands, faRocket, faSpaceShuttle, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/PlayListMusics.css'
import { useEffect, useRef, useState } from 'react';
import { usePlayList } from './customs/usePlayList';
import baseImg from '../img/base_image2.jpg'
import MusicVisualizer from './customs/MusicVisualizer';

const PlayListMusics = () => {
  const [isHovered, setIsHovered] = useState(false);
  const {selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic} = usePlayList();
  const [isSelectedMusicPlaying, setIsSelectedMusicPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const imageRef = useRef(null);

  useEffect(() => {
    // params의 id로 music 검색해서 db에서 데이터 가지고 와서
    // 새로고침해도 정보 유지가능하게

    const image = imageRef.current;

    if (image) {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colorCounts = {};

      for (let i = 0; i < imageData.length; i += 4) {
        const [r, g, b] = imageData.slice(i, i + 3);
        const color = `rgba(${r},${g},${b}, 0.2)`;

        colorCounts[color] = (colorCounts[color] || 0) + 1;
      }

      const maxColor = Object.keys(colorCounts).reduce((a, b) =>
        colorCounts[a] > colorCounts[b] ? a : b
      );

      setBackgroundColor(maxColor);
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
    <Box className='main-container' pt={70} w="68%">

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
        <Image src={baseImg} w="30%"  minW="100px"/>
        <Box ml={4}>
          <Text fontWeight="bold" fontSize="xl" style={{ wordWrap: "break-word" }}>
            {selectedMusic.title}
          </Text>
          <Text fontSize="sm" style={{ wordWrap: "break-word" }}>{selectedMusic.artist}</Text>
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
          <MusicVisualizer></MusicVisualizer>
      </Box>
      <Box w='100%' h="1px" mb="30px" style={{ backgroundColor }}></Box>

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
            <Text fontWeight="bold">{track.title}</Text>
            <Text fontSize="sm">{track.artist}</Text>
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
