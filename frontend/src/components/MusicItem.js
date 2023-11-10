import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/MusicItem.css'

const MusicItem = ({ img, title, artist, date, view, count, handlePlayMusic }) => {
  return (
    <Flex mb={4} className="music-item" position="relative">
      <Image mr='5' boxSize="40px" src={img} alt={title} />
      <Box className="play-icon">
        <FontAwesomeIcon icon={faPlayCircle} size="2xl"/>
      </Box>
      <Box>
        <Text className="text-hover" fontSize="md" fontWeight="bold" isTruncated width='290px' mr='10px'>{title}</Text>
        <Text fontSize="xs" color="gray.500">{count}回聞きました。</Text>
      </Box>
      
      <Text fontSize="sm" className="font_gray" isTruncated width="250px" mr='30px'>{artist}</Text>
      <Text fontSize="sm" className="font_gray" mr='30px'>{view} views</Text>
      
    </Flex>
  );
};

export default MusicItem;
