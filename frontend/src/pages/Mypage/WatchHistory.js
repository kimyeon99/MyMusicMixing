import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/customs/useAuth";
import MusicItem from "../../components/MusicItem";
import { usePlayList } from "../../components/customs/usePlayList";

const WatchHistory = () => {
    const [watchHistoryMusics, setWatchHistoryMusics] = useState([]);
    const { selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic } = usePlayList();
    const {user} = useAuth();

    useEffect(()=>{
        if(user){
            getWatchHistory();
        }
    }, [user])

    async function getWatchHistory(){
        const res = await axios.get(`http://localhost:4000/watch-history/${user.userId}?getNumber=5`);
        console.log('setWatchHistoryMusics' + JSON.stringify(res.data));
        return setWatchHistoryMusics(res.data);
    }

    function handlePlayMusic(music){
        changeSelectedMusic(music);
    }

    useEffect(() => {
        if (selectedMusic) {
            playToggleHandler();
        }
    }, [selectedMusic]);

    const groupedMusics = watchHistoryMusics.reduce((acc, music) => {
        const date = music.lastWatched.split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(music);
        return acc;
    }, {});

    return (
        <Box className="font_white" ml='45px' pt='100px'>
            <Box><Heading>視聴記録</Heading></Box>
            
            {Object.keys(groupedMusics).map(date => {
                const today = new Date().toISOString().split('T')[0];
                const displayDate = date === today ? '今日' : new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
                return (
                    <Box key={date} mt='40px'>
                        <Heading fontSize='24px' mb={2}>{displayDate}</Heading>
                        {groupedMusics[date].map((music, index) => (
                            <MusicItem
                                key={index}
                                img={music.img}
                                title={music.title}
                                artist={music.artist}
                                date={music.lastWatched}
                                view={music.view}
                                count={music.count}
                                handlePlayMusic={handlePlayMusic}
                            />
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
}

export default WatchHistory;
