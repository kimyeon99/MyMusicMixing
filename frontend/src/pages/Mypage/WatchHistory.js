import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/customs/useAuth";
import MusicItem from "../../components/MusicItem";

const WatchHistory = () => {
    const [watchHistoryMusics, setWatchHistoryMusics] = useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        getWatchHistory();
    }, [user])

    async function getWatchHistory(){
        const res = await axios.get(`http://localhost:4000/watch-history/${user.userId}`, 5);
        console.log('setWatchHistoryMusics' + JSON.stringify(res.data));
        return setWatchHistoryMusics(res.data);
    }

    return (
        <Box className="font_white">
            {watchHistoryMusics.map((data, index) => <MusicItem key={index} {...data} />)}
        </Box>
    );
}

export default WatchHistory;