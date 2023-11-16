import React, { useEffect, useState } from "react";
import { Box, Text, Heading, SimpleGrid, SkeletonText, Flex, SkeletonCircle, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const SkeletonUI = ({ responsive }) => {
  const [itemCount, setItemCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // 동적으로 responsive 객체의 프로퍼티에 접근
      const currentResponsive = Object.keys(responsive).find((key) => {
        const { min, max } = responsive[key].breakpoint;
        return width >= min && width <= max;
      });

      setItemCount(responsive[currentResponsive].items);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsive]);

  return (
    <Box
      className="music-list"
      p="20px"
      width="100%"
      style={{
        background: `-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.95))), #323232`,
      }}
    >
      <Box ml="10px">
        <button style={{ marginRight: "20px" }}>
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            color="white"
            size="xl"
          />
        </button>
        <button>
          <FontAwesomeIcon icon={faCircleChevronRight} color="white" size="xl" />
        </button>
      </Box>
      <Heading mt="10px" ml="10px" fontSize={28} color={"white"}>
        Musics
      </Heading>
      <Flex gap={4}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <Box key={index} className="sk-song musicItem">
            <Box>
              <Center flexDirection='column'>
               <SkeletonCircle
                className="album-image"
                maxW="180px"
                w="100%"
                h="140px"
                mb="4"
                borderRadius="8"
               />
               <SkeletonText noOfLines={1} w='100%' />
               <SkeletonText mt="5" noOfLines={1} w='100%'/>
              </Center>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SkeletonUI;
