import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Center, Flex, Heading, Image, LinkBox, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure,  } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faHome, faPauseCircle, faUpDown } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import '../css/font.css';
import { useAuth } from './customs/useAuth';
import PlaylistModal from './Modals/PlaylistModal.js';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import { hover } from '@testing-library/user-event/dist/hover.js';

const Sidebar = () => {
  const {user} = useAuth();
  const menu = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchHistory, setWatchHistory] = useState([]);

  function onOpen(){
    setIsModalOpen(true);
  }

  function onClose(){
    setIsModalOpen(false);
  }

  async function getWatchHistory(){
    const res = await axios.get(`http://localhost:4000/watch-history/${user.userId}?getNumber=4`);
    console.log('getWatchHistory' + JSON.stringify(res.data));
    return setWatchHistory(res.data);
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
                    <MenuItem>Logout</MenuItem>
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
            <Button size={'sm'} onClick={onOpen}>Create</Button>
            <PlaylistModal onClose={onClose} isModalOpen={isModalOpen}></PlaylistModal>
          </Box>
          
          <Box className='sideMenu'>
            <Accordion defaultIndex={[]} allowMultiple h='270px'>
              <AccordionItem border='none'>
                    <Heading fontSize='16px' className='font_white'>Record</Heading>
                <AccordionButton pl='0' onClick={getWatchHistory}>
                  <Button>
                    Look
                  </Button>
                </AccordionButton>
                
                <AccordionPanel overflowY={'auto'} pl='0' pb={'66px'} className='font_gray' maxW='320px' w='100%' h='200px'>
                  {watchHistory.map((item, key) => 
                    <Box key={item.music_id} m='0' p='0' h='120px'>
                      <Flex alignItems='center'>
                        <Image width='90%' maxW='80px' mr='2' src={item.music_img}></Image>
                      <Box>
                        <Text fontSize='18px' style={{padding:'0'}} className='font_white'>{item.music_title}</Text>
                        <Text fontSize='14px' className='font_gray'>{item.music_artist}</Text>
                        { 
                        parseInt(item.count) >=2 ?
                        <Box mr='auto'>
                          <Text ml='auto' fontSize='13px' className='font_gray'>{item.count}回聞きました。</Text>
                        </Box>
                        : <></>
                      }
                      </Box>
                      </Flex>
                    </Box>
                  )}
                  <Center>
                    <Link to='/mypage/watch-history' className='font_white'>더보기..</Link>
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
