import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { Box, Button, Center, Flex, Heading, LinkBox, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import '../css/font.css';

const Sidebar = () => {
  return (
      <Box className="sidebar">
        <Box className='sidebar_1'>
          <Heading className='logo sidebar_p font_white' fontSize={19}>MyMusicMixing</Heading>
          {/* <FontAwesomeIcon icon={faHome} style={{marginRight:'5px'}}
            as={motion.div} whileHover={{ scale: 1.1}}
            transition={{type:"spring", stiffness: 400, damping: 10}}></FontAwesomeIcon> */}
          <Box className='sidebar_p'>
            <Link to="/">
              <Text  className='font_gray'>홈</Text>
            </Link>
          </Box>
          <Box className='sidebar_p font_gray'>
            <Link to="/">
              <Text>검색</Text>
            </Link>
          </Box>
        </Box>
        <Box className='sidebar_2'>
          <Box className='sideMenu'>
            <Text className='font_white'>자신만의 플레이리스트 만들기</Text>
            <Text className='font_gray'>간단하게 가능.</Text>
            <Button size={'sm'}>작성</Button>
          </Box>
          <Box className='sideMenu'>
            <Text className='font_white'>시청기록</Text>
            <Text className='font_gray'>간단하게 가능.</Text>
            <Button size={'sm'}>보기</Button>
          </Box>
        </Box>
      </Box>
  );
};

export default Sidebar;
