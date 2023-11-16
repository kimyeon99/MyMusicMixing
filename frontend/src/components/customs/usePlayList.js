import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Pizzicato from 'pizzicato';

const PlayListContext = createContext();
{/* <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script> */}
export const usePlayList = () => {
  return useContext(PlayListContext);
}

export const PlayListProvider = ({ children }) => {
  const [playList, setPlayList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [playingMusic, setPlayingMusic] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isLoading, setIsLoading] = useState(true);
  const [isSideMusic, setIsSideMusic] = useState(false);

  //selectedMusicd은 말그대로 선택된것
  const soundRef = useRef(null); // Pizzicato.Sound 인스턴스를 저장하기 위한 useRef
  const ref = useRef();

  const changeSelectedMusic = (music) => {
    setSelectedMusic(music);
  }

  const addPlayList = (song) => {
    if(playList.includes(song)){
      return;
    }
    return setPlayList((prevPlayList)=> [...prevPlayList, song]);
  };

  const clearPlayList = () => {
    setPlayList([]);
  };

  const toggleIsSideMusic = () => {
    if(isSideMusic) setIsSideMusic(false);
    else setIsSideMusic(true);
  }

  const playToggleHandler = () => {
    setIsLoading(true);
    // playingMusic이 null인 경우 또는 선택된 음악과 현재 재생 중인 음악이 다른 경우
    if (!playingMusic || playingMusic !== selectedMusic) {
      createNewSound();
    } else {
      console.log(`playingMusic` +JSON.stringify(playingMusic) +'selectedMusic' +selectedMusic)
      playToggleMusicPlayer();
    }
  }
  
  const createNewSound = () => {
    // 기존에 재생하던 노래가 있다면 stop
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current = null;
    }

    let NowSongUrl;
    if(decodeURIComponent(selectedMusic.url)){
       NowSongUrl = decodeURIComponent(selectedMusic.url);
    }else{
      NowSongUrl = selectedMusic.url;
    }

    // 새로운 노래로 Pizzicato.Sound 객체 생성
    soundRef.current = new Pizzicato.Sound({
      source: 'file',
      options: { path: [NowSongUrl, selectedMusic.url], volume },
    }, function() {
        setIsLoading(false);
        soundRef.current.play(); // 새로운 노래 재생 시작
        setPlayingMusic(selectedMusic); // playingMusic 상태 업데이트
        setIsPlaying(true); 
        setIsSideMusic(true);
  
         var analyserNode= Pizzicato.context.createAnalyser();
         soundRef.current.connect(analyserNode);
         soundRef.current.analyserNode = analyserNode;
  
         soundRef.current.on('end', () => {
           // 음악이 종료될 때 다음 곡 재생 등의 로직 추가
         });
       });
  }
  
  const playToggleMusicPlayer = ()=> {
     if(isPlaying){
       soundRef.current.pause();
       setIsPlaying(false);
     }else{
       soundRef.current.play();
       setIsPlaying(true);
     }
  }

  const changeVolumeHandler = (newVolume)=> {
    if(soundRef.current){
      soundRef.current.volume = newVolume;
    }
  }

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume = volume;
    }
  }, [volume])

  return (
    <PlayListContext.Provider value={{ 
      playList, selectedMusic, changeSelectedMusic, addPlayList, clearPlayList, isPlaying, playToggleHandler, changeVolumeHandler, volume, isLoading, 
      isSideMusic, toggleIsSideMusic, soundRef, playingMusic
      , playToggleMusicPlayer}}>
        {children}
    </PlayListContext.Provider>
  );
}
