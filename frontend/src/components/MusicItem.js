import { Box, Image, Text, Flex } from "@chakra-ui/react";


// 여러 컴포넌트에서 공통으로 쓰일 musicItem 구상.
const MusicItem = ({ img, title, artist, date }) => {
  return (
    <Flex align="center" mb={4}>
      <Image boxSize="100px" src={img} alt={title} mr={4} />
      <Box>
        <Text fontSize="lg" fontWeight="bold">{title}</Text>
        <Text color="gray.500">{artist}</Text>
        <Text fontSize="sm" color="gray.500">{date}</Text>
      </Box>
    </Flex>
  );
};

export default MusicItem;
