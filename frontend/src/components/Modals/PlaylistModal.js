import { Box, Button, Center, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, background, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useAuth } from "../customs/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PlaylistModal = ({onClose, isModalOpen}) => {
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
    const [currentPlaylistMusics, setCurrentPlaylistMusics] = useState([]);
    const [songs, setSongs] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [addState, setAddState] = useState(false);

    const {user} = useAuth();
    const toast = useToast();

    const bg = useColorModeValue("gray.900", "gray.900");
    const color = useColorModeValue("white", "white");
    

    useEffect(() => {
        if(isModalOpen){
            handleGetMusicList();
            handleGetPlaylist(user.userId);
        }
    }, [isModalOpen]);
    
    async function handleGetMusicList() {
        const res = await axios.get('http://localhost:4000/music');
        const musiclist = res.data;
        setSongs(musiclist);
    }

    async function handleGetPlaylist(userId) {
        const res = await axios.get(`http://localhost:4000/playlist/${userId}`);
        const be_playlists = res.data;
        console.log(`be_playlists ${JSON.stringify(be_playlists)}`);
        if(be_playlists){
            setPlaylists(be_playlists);
        }else{
            setPlaylists([]);
        }
    }

    function handleOnDragEnd(result) {
        const { source, destination } = result;

        // 드랍 위치가 없거나 동일한 위치로 이동한 경우 아무것도 하지 않음
        if (!destination) {
          return;
        }
    
        // 같은 리스트 내에서 노래의 순서를 변경하는 경우
        if (source.droppableId === "songs" && destination.droppableId === "songs") {
          setSongs((prevSongs) => {
            const newSongs = Array.from(prevSongs);
            const [removed] = newSongs.splice(source.index, 1);
            newSongs.splice(destination.index, 0, removed);
            return newSongs;
          });
        }
    
        // 선택된 플레이리스트 내에서 음악의 순서를 변경하는 경우
        if (
            source.droppableId === "currentPlaylistMusics" &&
            destination.droppableId === "currentPlaylistMusics"
        ) {
            setCurrentPlaylist((prevPlaylist) => {
                const newMusics = Array.from(prevPlaylist.currentMusics);
                const [removed] = newMusics.splice(source.index, 1);
                newMusics.splice(destination.index, 0, removed);
                return {
                    ...prevPlaylist,
                    currentMusics: newMusics,
                };
            });
        }

    
        // 노래를 플레이리스트로 이동하는 경우
        if (
            source.droppableId === "songs" &&
            destination.droppableId === "currentPlaylistMusics"
        ) {
            const selectedSong = songs[source.index];
        
            if (!currentPlaylist) {
            return;
            }
    
            // 새로운 songs 배열 생성
            const newSongs = songs.filter((song) => song !== selectedSong);
            setSongs(newSongs);
        
            // 새로운 currentPlaylist 생성
            const newPlaylist = {
                ...currentPlaylist,
                currentMusics: [...currentPlaylist.currentMusics, selectedSong],
            };
            setCurrentPlaylist(newPlaylist);
        
            showCompleteToast('music');
        }
  
    }
    
    function showCompleteToast(type){
        switch(type){
            case 'music':
                return toast({
                    position: "top-left",
                    title: "ミュージック追加完了",
                    status: "success",
                    duration: 1500,
                    isClosable: true,
                })
            case 'playlist':
                return toast({
                    position: "top-left",
                    title: "プレイリスト追加完了",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
        }
    }

    function addPlaylist(title){
        setCurrentPlaylistIndex(0);
        const newPlaylist = {
            name: title,
            currentIndex: currentPlaylistIndex,
            currentMusics: [],
        };
        if(playlists.length >= 1){
            setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
        }else{
            setPlaylists([newPlaylist]);
        }
        setCurrentPlaylist(newPlaylist);
        setInputValue('');
        setAddState(false);
    }
    
    

    async function savePlaylist(currentPlaylist){
        const res = await axios.post(`http://localhost:4000/playlist/${user.userId}`, currentPlaylist);
        console.log(res);
        showCompleteToast('playlist');
        onClose();
    }

    // function addMusicToCurrentPlaylist(musicInfo){
    //     const selectedSong = musicInfo;

    //     // 선택된 노래를 songs 배열에서 제거
    //     setSongs(prevSongs => prevSongs.filter((song) => song.id !== musicInfo.id));
    
    //     // 선택된 노래를 currentPlaylist의 currentMusics 배열에 추가
    //     setCurrentPlaylist(prevPlaylist => ({
    //         ...prevPlaylist,
    //         currentMusics: [...prevPlaylist.currentMusics, selectedSong],
    //     }));
    // }
    
    
    return (
        <Box>
          <Modal size="2xl" isOpen={isModalOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="blackAlpha.900">
              <ModalHeader>
                <Box className="font_white">{currentPlaylist ? <Heading>プレイリスト{currentPlaylist.name}</Heading> : ""}</Box>
                <Box className="font_white">{playlists.length > 0 ? <Heading bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">{user.username}のプレイリスト</Heading> : <></>}</Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Flex justifyContent="space-between">
                  <Droppable droppableId="currentPlaylistMusics">
                    {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver
                                ? "rgba(0, 0, 0, 0.1)"
                                : "transparent",
                            padding: "8px",
                            borderRadius: "4px",
                        }}
                    >
                        <Box w="260px" h="400px" pr="5px" overflowY="auto">
                            <Center>
                                <Box>
                                {currentPlaylist ? (
                                currentPlaylist.currentMusics.map((music, index) => (
                            <Draggable key={music.id} draggableId={`music-${music.id}`} index={index}>
                            {(provided) => (
                                <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                p="2"
                                bg="gray.600" // 항목의 배경색을 조정
                                color="white" // 항목의 텍스트 색상을 조정
                                boxShadow="sm"
                                borderRadius="md"
                                mb="2"
                                w="240px"
                                >
                                <Text className="font_white">{music.title}</Text>
                                </Box>
                            )}
                            </Draggable>
                        ))
                        ) : playlists.length ? (
                            playlists.map((playlist, index) => (
                                <Draggable key={playlist.name} draggableId={`playlist-${playlist.name}`} index={index}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            p="2"
                                            bg="gray.600" // 항목의 배경색을 조정
                                            color="white" // 항목의 텍스트 색상을 조정
                                            boxShadow="sm"
                                            borderRadius="md"
                                            mb="3"
                                            w="250px"
                                            h="80px"
                                        >
                                            <Flex alignItems='center' justifyContent='center' h="100%">
                                                <Text fontSize={'21px'} className="font_white">{playlist.name}</Text>
                                            </Flex>
                                        </Box>
                                    )}
                                </Draggable>
                            ))
                        ) : (
                            <Box>
                                <Text className="font_white">No Playlist</Text>
                                <Button onClick={() => setAddState(true)} mb='10px'>Add</Button>
                                {addState && (
                                    <Box color='white'>
                                        <Input
                                            w="75%"
                                            placeholder="플레이리스트 이름"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                        <Button onClick={() => addPlaylist(inputValue)}>✔</Button>
                                    </Box>
                                )}
                            
                            </Box>
                        )}
                    </Box>
                </Center>
            </Box>
        </div>
        
        )}
        
                </Droppable>
                <Box pt="200px"><FontAwesomeIcon icon={faArrowLeft} color="white"/></Box>
                    <Droppable droppableId="songs">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "rgba(0, 0, 0, 0.1)"
                              : "transparent",
                            padding: "8px",
                            borderRadius: "4px",
                          }}
                        >
                          <Box w="250px" h="400px" pr='10px' overflowY="auto">
                            {currentPlaylist ? (
                              songs.map((song, index) => (
                                <Draggable
                                  key={song.id}
                                  draggableId={String(song.id)}
                                  index={index}
                                >
                                  {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        p="2"
                                        bg="gray.500" // 항목의 배경색을 조정
                                        color="white" // 항목의 텍스트 색상을 조정
                                        boxShadow="sm"
                                        borderRadius="md"
                                        mb="2"
                                        className="song-tile"
                                        _hover={{ bg: "gray.400", transition: "background-color 0.1s" }}
                                    >
                                        <Flex>
                                            <Text>{song.title}</Text>
                                        </Flex>
                                    </Box>
                                  )}
                                </Draggable>
                              ))
                            ) : (
                              <Text></Text>
                            )}
                          </Box>
                        </div>
                      )}
                    </Droppable>
                  </Flex>
                </DragDropContext>
              </ModalBody>
    
              <ModalFooter>
                <Button onClick={() => savePlaylist(currentPlaylist)} colorScheme="green" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose} colorScheme="blue">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      );
};

export default PlaylistModal;
