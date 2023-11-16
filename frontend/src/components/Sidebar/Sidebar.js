import { Link, useNavigate } from 'react-router-dom';
import '../../css/sidebar.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Center, Flex, Heading, Image, LinkBox, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure,  } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faHome, faPauseCircle, faPlay, faPlayCircle, faUpDown } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import '../../css/font.css';
import { useAuth } from '../customs/useAuth.js';
import PlaylistModal from '../Modals/PlaylistModal.js';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { hover } from '@testing-library/user-event/dist/hover.js';
import { usePlayList } from '../customs/usePlayList.js';

const Sidebar = () => {
  const {user, logout} = useAuth();
  const menu = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchHistory, setWatchHistory] = useState([]);
  const { selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic } = usePlayList();

  const navigate = useNavigate();

  const onOpen = () =>{
    setIsModalOpen(true);
  }

  const onClose = () =>{
    setIsModalOpen(false);
  }

  const getWatchHistory = async () =>{
    try{
      const res = await axios.get(`http://localhost:4000/watch-history/${user.userId}?getNumber=4`);
      return setWatchHistory(res.data);
    }catch(err){
      console.err(err);
    }
  }

  return (
      <Box className="sidebar">
        <Box className='sidebar_1'>
          <Link to="/">
            <Heading className='logo sidebar_p font_white' fontSize={19}>MyMusicMixing</Heading>
          </Link>
          {/* <FontAwesomeIcon icon={faHome} style={{marginRight:'5px'}}
            as={motion.div} whileHover={{ scale: 1.1}}
            transition={{type:"spring", stiffness: 400, damping: 10}}></FontAwesomeIcon> */}
          <Box className='sidebar_p'>
            <Box>
              {user ? 
                <Menu {...menu}>
                  <MenuButton as={Button} rightIcon={menu.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} colorScheme="yellow" mt='-3' ml='2'>
                    {user.username}
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Setting</MenuItem>
                    <MenuDivider/>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
              </Menu>  
                : 
                <Link to="/login"><Text className='font_gray'>Login</Text></Link>
              }
            </Box>

          </Box>
          <Box className='sidebar_p font_gray'>
            <Link to="/">
              <Text>Search</Text>
            </Link>
          </Box>
        </Box>
        <Box className='sidebar_2'>
          <Box className='sideMenu'>
            <Text className='font_white'>Create own playlist</Text>
            <Text className='font_gray'>It's simple</Text>
            {!user ? (
              <Tooltip label="ログインが必要です。" bg="red.600" placement="right">
                <Button size="sm" onClick={onOpen} isDisabled={true}>
                  Create
                </Button>
              </Tooltip>
            ) : (
              <Button size="sm" onClick={onOpen}>
                Create
              </Button>
            )}

            <PlaylistModal onClose={onClose} isModalOpen={isModalOpen}></PlaylistModal>
          </Box>
          
          <Box className='sideMenu'>
            <Accordion defaultIndex={[]} allowMultiple h='auto'>
              <AccordionItem border='none'>
                  <Heading fontSize='16px' className='font_white'>Record</Heading>
                  {!user ? 
                    <Tooltip label="ログインが必要です。" bg='red.600' placement='right'>
                    <Button mt='2' onClick={getWatchHistory} isDisabled={true}>
                        Look
                    </Button>
                  </Tooltip>
                  :
                    <AccordionButton
                      mt='2'
                      onClick={(e) => {getWatchHistory(); e.stopPropagation();}}
                      
                      backgroundColor="gray.200"
                      bg='gray.200'
                      _hover={{ backgroundColor: "gray.200" }}
                      _disabled={{ color: "gray.400" }}
                      w='80px'
                      borderRadius='5px'
                    >
                      <Text style={{padding:0}}>
                        Look
                      </Text>
                    </AccordionButton>
                  }
                  
                
                <AccordionPanel overflowY={'auto'} pl='0' pb={'66px'} className='font_gray' maxW='320px' w='100%' h='200px' mt='10px'>
                  {watchHistory.map((music, key) => 
                    <Box key={music.id} w='100%' m='0' mb='10px' p='0' h='80px' onClick={()=>navigate(`/playlist/${music.id}`)} className="musicItem">
                      <Flex>
                        <Box position="relative" mr='3'>
                          <Image  maxW='80px' src={music.img}></Image>
                          <Box className="playIcon">
                            <FontAwesomeIcon icon={faPlayCircle} size="2x" color='white'/>
                          </Box>
                        </Box>
                        <Box w='100%' overflow={'hidden'}>
                          <Text overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} fontSize='16px' style={{padding:'0'}} className='font_white'>{music.title}</Text>
                          <Text overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} fontSize='14px' className='font_gray'>{music.artist}</Text>
                          { 
                          parseInt(music.count) >=2 ?
                          <Box mr='auto'>
                            <Text ml='auto' fontSize='13px' className='font_gray'>{music.count}回聞きました。</Text>
                          </Box>
                          : <></>
                        }
                        </Box>
                      </Flex>
                    </Box>
                  )}
                  <Center mt='30px'>
                    <Link to='/mypage/watch-history' className='font_white hover'>더보기</Link>
                  </Center>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>

      </Box>
  );
};

export default Sidebar;
