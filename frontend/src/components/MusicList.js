import base_image_url from './base_image.png'
import '../css/MusicList.css'
import { usePlayList } from './customs/usePlayList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Box, Center, Heading, Image, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import baseImg2 from '../img/base_image2.jpg';
import "../css/test.css"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MusicList = ({ songs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addPlayList, selectedMusic, changeSelectedMusic, isSideMusic } = usePlayList();
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 4 });
    const navigate = useNavigate();

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    async function increaseMusicView(musicId){
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

    return (
        <Carousel showThumbs={false} dynamicHeight={false} showStatus={false}>
            <SimpleGrid columns={columns} spacing={10}>
                {songs.map((song, index) => 
                    <Box className="song" onClick={() => handlePlayMusic(song)}>
                        <Image src={baseImg2} alt={`Album ${index+1}`} className="album-image"/>
                        <Heading as="h3" size="md" mt={4}>{song.title}</Heading>
                        <Text mt={2}>{song.artist}</Text>
                    </Box>
                )}
            </SimpleGrid>
        </Carousel>
    );
};

export default MusicList;
