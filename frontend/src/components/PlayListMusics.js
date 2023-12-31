import { Box, Flex, Text, Image, Button, Icon, Circle, SkeletonCircle, Heading, Center } from '@chakra-ui/react';
import { faCreditCard, faFighterJet, faPause, faPauseCircle, faPlane, faPlay, faPrayingHands, faRocket, faSpaceShuttle, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { usePlayList } from './customs/usePlayList';
import MusicVisualizer from './customs/MusicVisualizer';
import ColorThief from 'colorthief';
import convert from 'color-convert';
import axios from 'axios';
import { useAuth } from './customs/useAuth';


const PlayListMusics = ({ loading }) => {
  const {user} = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const { selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic } = usePlayList();
  const [isSelectedMusicPlaying, setIsSelectedMusicPlaying] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const [dBgColor, setDBgColor] = useState('');
  const [playTime, setPlayTime] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lastImageUrl, setLastImageUrl] = useState(null); // 마지막 이미지 URL을 저장하는 상태 변수 추가

  useEffect(() => {
    let img;
    if (!loading) {
      setImageLoaded(false);
      img = document.getElementById('music_img');
      const colorThief = new ColorThief();

      const MaxBightness = 65;
      const MaxDarkBightness = 65;
      const Minbrightness = 40;
      const MinDarkbrightness = 40;
      // const Minbrightness = 40;
      // const MinDarkbrightness = 15;

      const handleImageLoad = () => {
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
        setImageLoaded(true); // 이미지 로딩 완료 시 상태 업데이트
        setLastImageUrl(selectedMusic.img); // 이미지 로딩 완료 시 마지막 이미지 URL 업데이트

      }


      img.onload = handleImageLoad;

      if(img.complete && (selectedMusic.img != lastImageUrl)){
        handleImageLoad();
      }
    };

    return ()=>{
      img.onload = null;
    }

  }, [loading]);

  const brightness = (rgb) => {
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

    ],
  };

  const handlePlayMusic = () => {
    playToggleHandler();
    if(user && !isPlaying){
      setPlayTime(0); // 재생 시간 초기화
      addMusicToWatchHistory();
    }
  }

  const addMusicToWatchHistory = () => {
    const interval = setInterval(() => {
      setPlayTime((prevPlayTime) => prevPlayTime + 1);
    }, 1000);
  
    // 10초 후에 실행할 작업을 예약
    setTimeout(() => {
      setPlayTime((currentPlayTime) => {
        // 10초 이상 재생한 경우에만 시청 기록에 추가
        if (currentPlayTime >= 10) {
          axios.post(`http://localhost:4000/watch-history/${user.userId}/${selectedMusic.id}`)
            .then((res) => {
              console.log('시청 기록이 추가되었습니다.');
            })
            .catch((error) => {
              console.error('시청 기록 추가 중 오류가 발생했습니다.', error);
            });
        }
        clearInterval(interval);
        return currentPlayTime;
      });
    }, 10000);
  }  

  return (
    // style={{ background: `linear-gradient(to bottom, ${bgColor}, #000)` }}
    <Box className='main-container' mt='7px' position={'relative'} height='100%'>
      <Box w={'100%'} h={'55%'}></Box>
      <Box
        width='100%'
        height='90%'
        style={{
          background: `linear-gradient(to bottom,
        ${dBgColor} 0%,
        rgba(0,0,0,.5) 70%)`,
        }}
        position='absolute'
        top='0%'
        borderRadius='8px'
      >
        <Box>
          <Flex position="relative" alignItems="center" color="white" p={10} mt={10}>
            <Box
              position="absolute"
              top={0}
              left={0}
              width='100%'
              height='95%'
              style={{ background: `-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))), ${bgColor}` }}
            >
            </Box>

            <Box ml={-3} shadow="dark-lg" zIndex={9999} backgroundColor='transparent'>
              <Image id='music_img' src={selectedMusic.img} maxH='232px' minH='232px' maxW="302px" />
            </Box>



            {/* <Box ml={4} shadow="dark-lg" zIndex={9999} backgroundColor='transparent' aspectRatio={1}>
          <Image id='music_img' src={selectedImage} w="100%" h="100%" objectFit="cover" />
        </Box> */}

            <Box ml={4} zIndex="9999">
              <Text className="font_white" fontWeight="bold" fontSize="60px" style={{ wordWrap: "break-word" }}>
                {selectedMusic.title}
              </Text>
              <Text className='font_gray' fontSize="sm" style={{ wordWrap: "break-word" }}>{selectedMusic.artist}</Text>
              <Box zIndex="9999" >
                {
                  playingMusic !== selectedMusic ? <></> :
                    <MusicVisualizer width={300} height={100} color={bgColor}></MusicVisualizer>
                }
              </Box>
            </Box>

          </Flex>


        </Box>


        <Box ml="20px">
          {playingMusic == selectedMusic && isPlaying ? (
            <Button w={50} h={50} m={2} mb={10} onClick={handlePlayMusic} colorScheme='gray' style={{ borderRadius: "100%" }}>
              <FontAwesomeIcon icon={faPause} size="xl" className="pulse-slow-animation" color={bgColor} />
              {/* className="slow-bounce-animation" */}
            </Button>
          ) : (
            <Button w={50} h={50} m={2} mb={10} onClick={handlePlayMusic} colorScheme='blue' style={{ borderRadius: "100%" }}>
              <FontAwesomeIcon icon={faPlay} size='xl' className='move-animation' />
            </Button>
          )}
          {/* <MusicVisualizer width={'100%'} height={100}></MusicVisualizer> */}
        </Box>

        {playlistData.tracks.map((track, index) => (
          <Flex ml={5} key={index} alignItems="center" mb={2} w="80%" className='playListMusicsItem'
            _hover={{
              cursor: "pointer",
              filter: "blur(0.4px)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            <Image src={track.imageUrl} alt={track.title} boxSize="60px" />
            <Box ml={2}>
              <Text className='font_white' fontWeight="bold">{track.title}</Text>
              <Text className='font_gray' fontSize="sm">{track.artist}</Text>
            </Box>
            <Button
              ml="auto"
              rightIcon={<FontAwesomeIcon icon={faPlay} />}
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
