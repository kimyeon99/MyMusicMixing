import Sidebar from "../components/Sidebar";
import PlayListMusics from "../components/PlayListMusics";
import { usePlayList } from "../components/customs/usePlayList";
import SideMusic from "../components/SideMusic.js";
import MusicPlayer from "../components/customs/MusicPlayer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Main.css";
import { Box, Center, Spinner } from "@chakra-ui/react";
import '../css/sidebar.css';

const PlayList = () => {
  const { changeSelectedMusic, isSideMusic } = usePlayList();
  const { musicId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    const getMusicData = async () => {
      try{
        const musicData = await axios.get(`http://localhost:4000/music/${musicId}`);
        changeSelectedMusic(musicData.data);
        console.log(musicData.data);
      }catch{
        console.log('refresh music error');
      }finally{
        setLoading(false);
      }
    }
    getMusicData();
  }, [musicId]);

  return (
      <Box>{
        loading ? <Center><Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <h1 color="black">{loading}</h1>
        </Center> :
      <div className="App">
        <Box className="back_sidebar"></Box>
        <Sidebar />
        <MusicPlayer />
        <PlayListMusics loading={loading} style={{width:'100%'}}></PlayListMusics>
        <SideMusic></SideMusic>
      </div>
      }
    </Box>
  );
}

export default PlayList;