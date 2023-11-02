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
import { Box, Center, Heading } from "@chakra-ui/react";
import { useAuth } from "./customs/useAuth.js";

const Main = () => {
  const [songs, setSongs] = useState([]);
  const { isSideMusic } = usePlayList();
  const [mostViewedMusicList, setMostViewedMusicList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    handleGetMusicList();
    handleGetMostViewedMusicList();
  }, []);

  async function handleGetMusicList() {
    const res = await axios.get('http://localhost:4000/music');
    const musiclist = res.data;
    setSongs(musiclist);
  }

  async function handleGetMostViewedMusicList() {
    axios.get('http://localhost:4000/music/mostViewed')
      .then(res => {
        console.log(res.data);
        setMostViewedMusicList(res.data);
      });
  }

  return (
    <Box>
      <div className="App">
        <Sidebar />
        <MusicPlayer />
        <Box className="main-container">
          <Box className="istyle">
            <MusicList songs={songs}></MusicList>
            <Slideshow mostViewedMusicList={mostViewedMusicList}></Slideshow>
            <TrackList ></TrackList>
          </Box>
        </Box>
        <SideMusic></SideMusic>
      </div>
    </Box>
  );
};

export default Main;
