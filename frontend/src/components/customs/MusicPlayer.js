import React, { useState, useRef, useEffect } from 'react';
import '../../css/MusicPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { usePlayList } from './usePlayList';
import { Box, Center, Flex, Heading, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { color } from 'framer-motion';

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const { selectedMusic, playToggleMusicPlayer, playingMusic, playList, playToggleHandler, isPlaying, changeVolumeHandler, volume } = usePlayList(); // loadPlayList 함수 추가
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === playList.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? playList.length - 1 : prevIndex - 1));
  };

  function changeVolume(newVolume) {
    changeVolumeHandler(parseFloat(newVolume));
  }

  return (
    <div className="music-player" style={{ minHeight: "66px" }}>
      {playingMusic ? (
        <div>
          {/* <h2>Playing: {playList[currentSongIndex].title}</h2> */}
          <Flex width='100%' alignItems="center">
            <Box mr='100px'>
              <Heading size={'sm'} color='whiteAlpha.900'>{playingMusic.title}</Heading>
            </Box>
            <Box className="controls" mr='100px'>
              <button onClick={prevSongHandler} className="control-button">
                <FontAwesomeIcon icon={faStepBackward} />
              </button>
              <button onClick={playToggleMusicPlayer} className="control-button">
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} color="black" />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </button>
              <button onClick={nextSongHandler} className="control-button">
                <FontAwesomeIcon icon={faForwardStep} />
              </button>

              <Slider defaultValue={0.25} min={0} max={1} step={0.01} onChange={val => changeVolume(val)}>
                <SliderTrack bg='white'>
                  <Box position='relative' right={10} />
                  <SliderFilledTrack bg='red' />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>

            </Box>
          </Flex>
        </div>
      ) : (
        <div>
          <Box className="controls" style={{ textAlign: 'center' }} mr='100px'>
            <button className="control-button">
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            <button className="control-button">
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="control-button">
              <FontAwesomeIcon icon={faForwardStep} className="control-button" />
            </button>

            <Slider defaultValue={0.25} min={0} max={1} step={0.1} onChange={val => changeVolume(val)}>
              <SliderTrack bg='white'>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='red' />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Box>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
