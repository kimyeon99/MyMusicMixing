import Slideshow from "./Slideshow.js";
import "../css/Main.css"
import MusicList from "./MusicList.js";
import MusicPlayer from "./customs/MusicPlayer.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePlayList } from "./customs/usePlayList.js";
import Sidebar from "./Sidebar.js";
import TrackList from "./TrackList.js";
import SideMusic from "./SideMusic.js";
import { Box, Heading  } from "@chakra-ui/react";
import { useAuth } from "./customs/useAuth.js";


  const Main = () => {
    const [songs, setSongs] = useState([]);
    const {isSideMusic} = usePlayList();
    const {user} = useAuth();
    
  useEffect(() => {
    handleGetMusicList();
  }, []);

  async function handleGetMusicList(){
    const res = await axios.get('http://localhost:4000/music');
    const musiclist = res.data;
    console.log('musiclist: ' + JSON.stringify(musiclist.data));
    setSongs(musiclist);
  }

  return (
    <Box className="App">
      <Box className="back_sidebar"></Box>
      <Sidebar/>
      <MusicPlayer/>
      <Box className="main-container">
        <Box className="istyle">
          {user ? <h1 color="white">로그인 했습니다.</h1> :  <h1 color="white">로그인 하지않음</h1>}
          <Slideshow ></Slideshow> 
          <TrackList ></TrackList>
          <Box><Heading pb={1} fontSize={28} color={"gray.300"}>노래</Heading></Box>
          <MusicList songs={songs}></MusicList>
        </Box>
      </Box>
      <SideMusic></SideMusic>
    </Box>
  );
};

export default Main;
