import React, { useState, useRef, useEffect } from 'react';
import '../../css/MusicPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { usePlayList } from './usePlayList';
import Pizzicato from 'pizzicato';
import { Box, Center, Heading, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const { selectedMusic,playToggleMusicPlayer, playingMusic, playList, playToggleHandler, isPlaying, changeVolumeHandler, volume } = usePlayList(); // loadPlayList 함수 추가
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
    <div className="music-player">
      {playingMusic ? (
        <div>
            {/* <h2>Playing: {playList[currentSongIndex].title}</h2> */}
            <Heading size={'sm'}>{playingMusic.title} and {isPlaying ? 'true': 'false'}</Heading>
            <Box className="controls" w={'100%'}>
              <button onClick={prevSongHandler} className="control-button">
                <FontAwesomeIcon icon={faStepBackward} />
              </button>
              <button onClick={playToggleMusicPlayer} className="control-button">
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} color="black"/>
                ) : (
                  <FontAwesomeIcon icon={faPlay}/>
                )}
              </button>
              <button onClick={nextSongHandler} className="control-button">
                <FontAwesomeIcon icon={faStepForward} />
              </button>

              <Slider defaultValue={0.25} min={0} max={1} step={0.01} onChange={val => changeVolume(val)}>
                <SliderTrack bg='white'>
                  <Box position='relative' right={10} />
                  <SliderFilledTrack bg='red' />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>

            </Box>
        </div>
      ) : (
        <div>
          <h2>NOT PLAYING and {isPlaying ? 'true': 'false'}</h2>
          <div className="controls" style={{ textAlign: 'center' }}>
            <button className="control-button">
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            <button className="control-button">
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="control-button">
              <FontAwesomeIcon icon={faStepForward} />
            </button>

            <Slider defaultValue={0.5} min={0} max={1} step={0.1} onChange={val => changeVolume(val)}>
                <SliderTrack bg='white'>
                  <Box position='relative' right={10} />
                  <SliderFilledTrack bg='red' />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
