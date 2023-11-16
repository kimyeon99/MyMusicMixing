import Slideshow from "./Slideshow.js";
import MusicList from "./MusicList.js";
import MusicPlayer from "./customs/MusicPlayer.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePlayList } from "./customs/usePlayList.js";
import Sidebar from "./Sidebar/Sidebar.js";
import TrackList from "./TrackList.js";
import SideMusic from "./SideMusic.js";
import { Box, Center, CircularProgress, Heading, Skeleton } from "@chakra-ui/react";
import { useAuth } from "./customs/useAuth.js";
import useSWR from "swr";
import '../css/test.css';
import SkeletonUI from "./Skeletons/SkeletonUI.js";

const Main = () => {
  const { isSideMusic } = usePlayList();
  const [mostViewedMusicList, setMostViewedMusicList] = useState([]);
  const { user } = useAuth();
  const {data:songs, error, isLoading } = useSWR('http://localhost:4000/music', { refreshInterval: 50000 });

  useEffect(() => {
    // handleGetMusicList();
    handleGetMostViewedMusicList();
  }, []);

  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 5000, min: 1500 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 1500, min: 1300 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1300, min: 1100 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 1100, min: 900 },
        items: 3
    },
    mobile_900: {
      breakpoint: { max: 900, min: 700 },
      items: 2
    },
    mobile_700: {
      breakpoint: { max: 700, min: 0 },
      items: 1
    },

};

  const handleGetMostViewedMusicList = async () => {
    axios.get('http://localhost:4000/music/mostViewed')
      .then(res => {
        console.log(res.data);
        setMostViewedMusicList(res.data);
      });
  }

  return (
        <Box className="main-container">
          <Box className="istyle">
            {isLoading ? <SkeletonUI responsive={responsive}></SkeletonUI>: <MusicList songs={songs} responsive={responsive}></MusicList>}
            
            <Slideshow mostViewedMusicList={mostViewedMusicList}></Slideshow>
            <TrackList ></TrackList>
          </Box>
        </Box>
  );
};

export default Main;
