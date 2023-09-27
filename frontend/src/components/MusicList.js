import base_image_url from './base_image.png'
import '../css/MusicList.css'
import { usePlayList } from './customs/usePlayList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Image, Text } from '@chakra-ui/react';

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

    function handlePlayMusic(music) {
        changeSelectedMusic(music);
        // openModal();
        return navigate('/playList');
    }

    return (
        <div className="music-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                        <p className="music-title">{music.title}</p>
                        <p className="music-artist">{music.artist}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MusicList;
