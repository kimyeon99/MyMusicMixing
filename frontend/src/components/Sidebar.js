import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Flex, Heading, LinkBox, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure,  } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faHome, faPauseCircle, faUpDown } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import '../css/font.css';
import { useAuth } from './customs/useAuth';
import PlaylistModal from './Modals/PlaylistModal.js';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';

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
    const res = await axios.get(`http://localhost:4000/watch-history/${user.userId}`);
    console.log('getWatchHistory' + JSON.stringify(res.data));
    return setWatchHistory(res.data);
  }

  

  return (
      <Box className="sidebar">
        <Box className='sidebar_1'>
          <Heading className='logo sidebar_p font_white' fontSize={19}>MyMusicMixing</Heading>
          {/* <FontAwesomeIcon icon={faHome} style={{marginRight:'5px'}}
            as={motion.div} whileHover={{ scale: 1.1}}
            transition={{type:"spring", stiffness: 400, damping: 10}}></FontAwesomeIcon> */}
          <Box className='sidebar_p'>
            <Link to="/">
              <Text  className='font_gray'>Home</Text>
            </Link>
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
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                    <Heading className='font_white'>Record</Heading>
                  
                <AccordionButton pl='0' onClick={getWatchHistory}>
                  <Button>
                    Look
                  </Button>
                </AccordionButton>
                
                <AccordionPanel pb={4} className='font_gray' maxW='320px' w='100%'>
                  {watchHistory.map((key, value) => {
                   return <Text className='font_white' key={key}>{key.musicId}</Text>
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box ml={5} mt={100}>
          {user ? 
            <Menu {...menu}>
              <MenuButton as={Button} rightIcon={menu.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} colorScheme="yellow" mt="100px">
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
            <Link to="/login"><Text color="white">Login</Text></Link>
          }
        </Box>
      </Box>
  );
};

export default Sidebar;
