import base_image_url from './base_image.png'
import '../css/MusicList.css'
import { usePlayList } from './customs/usePlayList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Box, Center, Image, Text } from '@chakra-ui/react';
import axios from 'axios';

const MusicList = ({ songs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addPlayList, selectedMusic, changeSelectedMusic, isSideMusic } = usePlayList();
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
        <Box className="music-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {songs.map((music, index) => (
                <div key={index} className="music-item font-hover" onClick={() => handlePlayMusic(music)}>
                    <div className="image-container">
                        {
                            music.image ? (
                                <img
                                    src={music.image}
                                    alt={`Album ${index + 1}`}
                                    className="album-image"
                                    style={{ borderRadius: '6%' }}
                                />
                            )
                                :
                                <Image
                                    src={base_image_url}
                                    alt={`Album ${index + 1}`}
                                    className="album-image"
                                    style={{ borderRadius: '50%' }}
                                />
                                
                                
                        }
                    </div>

                    {/* <PlayModal isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal}></PlayModal> */}

                    <div className="music-details" style={{ textAlign: 'center' }}>
                        <p className="music-title font_white">{music.title}</p>
                        <p className="music-artist font_gray">{music.artist}</p>
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default MusicList;
