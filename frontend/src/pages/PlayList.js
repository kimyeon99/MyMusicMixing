import Sidebar from "../components/Sidebar/Sidebar.js";
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

  useEffect(() => {
    setLoading(true);
    const getMusicData = async () => {
      if (musicId) {
        try {
          const musicData = await axios.get(`http://localhost:4000/music/${musicId}/getOne`);
          changeSelectedMusic(musicData.data);
          console.log(musicData.data);
        } catch {
          console.log('refresh music error');
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    }
    getMusicData();
  }, [musicId]);

  return (
    loading ? (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          justifyContent='center'
        />
        <h1 color="black">{loading}</h1>
      </Center>
    ) : (
      <PlayListMusics loading={loading} style={{ width: '100%' }} />
    )
  );
  
}

export default PlayList;