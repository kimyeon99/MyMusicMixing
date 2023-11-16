import { Box, Image, Text, Flex, CircularProgress } from "@chakra-ui/react";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/MusicItem.css'
import { usePlayList } from "./customs/usePlayList";
import { useState } from "react";

const MusicItem = ({ img, title, url, artist, date, view, count, handlePlayMusic, isLoading }) => {
  const { selectedMusic, isPlaying, playingMusic, playToggleHandler, changeSelectedMusic } = usePlayList();

  return (
    <Flex mb={4} className="music-item-ind" position="relative" alignItems={'center'} onClick={()=>{handlePlayMusic({img,title,artist,date,view,count,url})}}>
      {isLoading ? <CircularProgress></CircularProgress>:
      <Image mr='5' boxSize="40px" src={img} alt={title} />
      }
      <Box className="play-icon">
        <FontAwesomeIcon icon={faPlayCircle} size="2xl"/>
      </Box>
      <Box>
        <Text className="text-hover" fontSize="md" fontWeight="bold" isTruncated width='290px' mr='10px'>{title}</Text>
        <Text fontSize="xs" color="gray.500">{count}回聞きました。</Text>
      </Box>
      
      <Text fontSize="xs" className="font_gray" isTruncated width="250px" mr='30px'>{artist}</Text>
      <Text fontSize="xs" className="font_gray" mr='30px'>{view} views</Text>
      
    </Flex>
  );
};

export default MusicItem;
