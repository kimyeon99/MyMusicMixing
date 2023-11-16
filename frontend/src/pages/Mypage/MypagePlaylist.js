import { Box, Button, Center, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useAuth } from "../../components/customs/useAuth";

const MypagePlaylist = () =>{
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
    const [currentPlaylistMusics, setCurrentPlaylistMusics] = useState([]);
    const [songs, setSongs] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [addState, setAddState] = useState(false);

    const {user} = useAuth();
    const toast = useToast();

    useEffect(()=>{
        handleGetMusicList();
        if(user){
            handleGetPlaylist(user.userId);
        }
    }, []);

    const handleGetMusicList = async () => {
        try{
            const res = await axios.get('http://localhost:4000/music');
            return setSongs(res.data);
        }catch(err){
            console.err(err);
        }
    }

    const handleGetPlaylist = async ( userId) => {
        try{
            const res = await axios.get(`http://localhost:4000/playlist/${userId}`);
            const be_playlists = res.data;
            if(be_playlists){
                setPlaylists(be_playlists);
            }else{
                setPlaylists([]);
            }
        }catch(err){
            console.err(err);
        }
    }

    const addPlaylist = (title) => {
        setCurrentPlaylistIndex(0);
        const newPlaylist = {
            name: title,
            currentIndex: currentPlaylistIndex,
            currentMusics: [],
        };
        setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
        setCurrentPlaylist(newPlaylist);
        setInputValue('');
        setAddState(false);
    }

    const addMusicToCurrentPlaylist = (musicInfo) => {
        const selectedSong = musicInfo;

        // 선택된 노래를 songs 배열에서 제거
        setSongs(prevSongs => prevSongs.filter((song) => song.id !== musicInfo.id));
    
        // 선택된 노래를 currentPlaylist의 currentMusics 배열에 추가
        setCurrentPlaylist(prevPlaylist => ({
            ...prevPlaylist,
            currentMusics: [...prevPlaylist.currentMusics, selectedSong],
        }));
    }

    const savePlaylist  = async (currentPlaylist) =>{
        try{
            const res = await axios.post(`http://localhost:4000/playlist/${user.userId}`, currentPlaylist);
            return handleGetPlaylist(user.userId);
        }catch(err){
            console.err(err);
        }
    }

    return (
    <Box>
        <Center><Heading>{currentPlaylist ? currentPlaylist.name : ''}</Heading></Center>
        <Center bg={'blackAlpha.400'}  pt='50px' h='100%'>
            <Box h='500px' bg='blue' w='300px' mr='30px'>
                {currentPlaylist ?
                    currentPlaylist.currentMusics.map((music, index) =>
                        <Box><Text>{music.title}</Text></Box>
                    )                    
                    : 
                    
                    playlists.length ?
                        playlists.map((playlist, index) =>
                            <Box><Text>{playlist.name}</Text></Box>
                        )
                        :
                        (<Box>
                            <Text>Nothing</Text>
                            <Button onClick={() => 
                                setAddState(true)}>추가</Button>
                                    {addState && (
                                        <Box>
                                            <Input w="75%" placeholder="플레이리스트 이름" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                            <Button onClick={() => addPlaylist(inputValue)}>✔</Button>
                                        </Box>
                                    )}
                        </Box>)

                }
            </Box>
            <Box h='500px' bg='red' w='300px' overflowY={"auto"} overflowX={"hidden"}>
                {
                    currentPlaylist ? 
                        songs.map((song, index) => 
                        <Box>
                            <Flex justifyContent='flex-end'>
                            <Button onClick={() => {addMusicToCurrentPlaylist(song)}}>
                                <Text className="font_gray">{song.title}</Text>
                            </Button>    
                            </Flex>
                        </Box>
                    )
                        : 'help'
            }
            </Box>
        </Center>
        <Center>
            <Box>
                <Button onClick={()=>savePlaylist(currentPlaylist)} colorScheme="green" mr={3}>Save</Button>
            </Box>
        </Center>
    </Box>);
}

export default MypagePlaylist;
