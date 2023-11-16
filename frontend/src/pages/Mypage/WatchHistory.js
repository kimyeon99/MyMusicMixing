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
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { data: watchHistoryMusics, error } = useSWR(
        user ? `http://localhost:4000/watch-history/${user.userId}?getNumber=20` : null,
    );
    const [groupedMusics, setGroupedMusics] = useState([]);

    const handlePlayMusic = (music) => {
        changeSelectedMusic(music);
    }

    useEffect(() => {
        if (selectedMusic) {
            setIsLoading(true);
            playToggleHandler(selectedMusic);
        }
    }, [selectedMusic]);
    
    

    useEffect(() => {
        if (watchHistoryMusics) {
            const groupedData = watchHistoryMusics.reduce((item, music) => {
                const date = moment(music.lastWatched).format('YYYY-MM-DD');
                if (!item[date]) item[date] = [];
                item[date].push(music);
                return item;
            }, {});
            setGroupedMusics(groupedData);
        }
    }, [watchHistoryMusics]);

    return (
        <Box className="font_white" pl='60px' mt='30px' mb="75px" overflowY={'auto'} pr='130px'>
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
                                url={music.url}
                                isLoading={isLoading}
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
