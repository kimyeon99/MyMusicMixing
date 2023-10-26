import baseImg2 from '../img/base_image2.jpg';
import { usePlayList } from './customs/usePlayList';
import { redirect, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight, faCircleArrowRight, faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../css/test.css';

const MusicList = ({ songs }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { addPlayList, selectedMusic, changeSelectedMusic, isSideMusic } = usePlayList();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    async function increaseMusicView(musicId) {
        try {
            const res = await axios.post(`http://localhost:4000/music/${musicId}/increaseView`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    function handlePlayMusic(music) {
        changeSelectedMusic(music);
        increaseMusicView(music.id);
        return navigate(`/playList/${music.id}`);
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 1500, min: 1200 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1200, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };

    return (
        <Box className='music-list'
            p='20px'
            width='100%'
            style={{
                background:
                    `-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.95))), #323232`
            }}
        >
            <Box ml='10px'>
                <button onClick={() => carouselRef.current.previous()} style={{ marginRight: '20px' }}><FontAwesomeIcon icon={faCircleChevronLeft} color='white' size='lg' /></button>
                <button onClick={() => carouselRef.current.next()}><FontAwesomeIcon icon={faCircleChevronRight} color='white' size='lg' /></button>
            </Box>
            <Heading mt='10px' ml='10px' fontSize={28} color={"white"}>Musics</Heading>
            <Carousel
                responsive={responsive}
                arrows={false}
                ref={carouselRef}
                className='carousel'
            >
                {songs.map((song, index) =>
                    <Box className="song" onClick={() => handlePlayMusic(song)}>
                        <Image src={song.img} alt={`Album ${index + 1}`} className="album-image" />
                        <Heading fontSize='16px' mt={3} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" width="calc(90%)" color='white'>{song.title}</Heading>
                        <Text fontSize='14px' mt={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="wrap" width="calc(90%)" color={'whiteAlpha.600'}>{song.artist}</Text>
                    </Box>
                )}
            </Carousel>
        </Box>
    );
};

export default MusicList;