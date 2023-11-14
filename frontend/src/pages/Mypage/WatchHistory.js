import { Box, Heading, Progress } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/customs/useAuth";
import MusicItem from "../../components/MusicItem";
import { usePlayList } from "../../components/customs/usePlayList";
import moment from 'moment';
import useSWR from "swr";
import authAxios from "../../components/customs/authAxios";

const WatchHistory = () => {
    const { selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic } = usePlayList();
    const { user } = useAuth();
    const { data: watchHistoryMusics, error, isLoading } = useSWR(
        user ? `http://localhost:4000/watch-history/${user.userId}?getNumber=5` : null,
    );
    const [groupedMusics, setGroupedMusics] = useState([]);

    function handlePlayMusic(music) {
        changeSelectedMusic(music);
    }

    useEffect(() => {
        if (watchHistoryMusics) {
            const groupedData = watchHistoryMusics.reduce((acc, music) => {
                const date = moment(music.lastWatched).format('YYYY-MM-DD');
                if (!acc[date]) acc[date] = [];
                acc[date].push(music);
                return acc;
            }, {});
            setGroupedMusics(groupedData);
        }
    }, [watchHistoryMusics]);

    if (isLoading || groupedMusics === null) {
        return (
        <Box className="font_white" ml="45px" pt="300px" textAlign="center" w='60%'>
            <Progress size={"sm"} isIndeterminate colorScheme={"cyan"} bgGradient="linear(to-l, #7928CA,#FF0080)" h="14px"/>
        </Box>          
        )}


    return (
        <Box className="font_white" ml='45px' pt='100px'>
            <Box><Heading>視聴記録</Heading></Box>

            {Object.keys(groupedMusics).map(date => {
                const today = moment().format('YYYY-MM-DD');
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
