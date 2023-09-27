import Sidebar from "../components/Sidebar";
import PlayListMusics from "../components/PlayListMusics";
import { usePlayList } from "../components/customs/usePlayList";
import SideMusic from "../components/SideMusic.js";
import MusicPlayer from "../components/customs/MusicPlayer";

const PlayList = () => {
  const { isSideMusic } = usePlayList();

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Sidebar />
      <PlayListMusics></PlayListMusics>
      <SideMusic></SideMusic>
      <MusicPlayer />
    </div>
  );
}

export default PlayList;