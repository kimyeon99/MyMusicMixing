import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { Box, Flex, Heading, LinkBox } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';

const Sidebar = () => {
  return (
    <Box className="sidebar" textAlign="center">
      <div className="categories">
      <Box p={4}>
        <Link to="/" className="logo">
          <Flex alignItems={'center'} >
            <FontAwesomeIcon icon={faHome} style={{marginRight:'5px'}}></FontAwesomeIcon>
            <Heading as={motion.div} whileHover={{ scale: 1.1}}
                                    transition={{type:"spring", stiffness: 400, damping: 10}}>MMM</Heading>
         </Flex>
        </Link>
      </Box>
        <ul>
          <li>카테고리 1</li>
          <li>카테고리 2</li>
          <li>카테고리 3</li>
          {/* 다른 카테고리 아이템 추가 */}
        </ul>
      </div>
    </Box>
  );
};

export default Sidebar;
