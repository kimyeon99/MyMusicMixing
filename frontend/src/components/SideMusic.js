import { Box, Button, Center, Flex, Heading, Img, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { usePlayList } from "./customs/usePlayList";
import baseImg from '../img/base_image2.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faPlane, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { wrap } from "framer-motion";
import { useMusicEffect } from "./customs/useMusicEffect";
import MusicVisualizer from "./customs/MusicVisualizer";


const SideMusic = () => {
    const {isSideMusic, toggleIsSideMusic, selectedMusic} = usePlayList();

    return (
        <Box
            w={isSideMusic ? '26%' : '0'}
            h="3000px"
            bg="#181818"
            color="white"
            overflowX="hidden"
            zIndex="9999"
            textAlign="center"
            position="fixed"
            right="0"
        >

        {
            
        <Button
            position="fixed"
            top="50%"
            right="16.1%"
            onClick={toggleIsSideMusic}
            bgColor="red.700"
        >
        <FontAwesomeIcon icon={faPlane} size="xl" bounce/>
        </Button>
        }

        {selectedMusic ?
            <Box>
                <Center>
                    <Box>
                        <Heading pt="20px">{selectedMusic.title}</Heading>
                        <Text pt="5px">{selectedMusic.artist}</Text>
                        <Img p="20px" src={baseImg}></Img>
                    </Box>
                </Center>
                <Box>
                    customs
                    <Center>
                        <Equalizers></Equalizers>
                    </Center>
                </Box>
            </Box>
            : <Heading p="20px">library</Heading>
        }
      </Box>
    );
}

export default SideMusic;


const Equalizers = () => {
    const textStyle = {
        writingMode: "vertical-rl", // 세로로 배치
        textOrientation: "mixed", // 텍스트 방향 혼합
        padding: "4px",
        color: "white",
      };

    const {changeReverb, changeDelay, changeChorus, changeDistortion} = useMusicEffect();

    return (
        <Box>
            <Flex gap={3} w={"100%"} flexWrap={wrap} pb={3}>
                <Button onClick={changeReverb}>Concert</Button>
                <Button onClick={changeDelay}>Delay</Button>
            </Flex>
            <Flex gap={3} w={"100%"} flexWrap={wrap}>
                <Button onClick={changeChorus}>Chorus</Button>
                <Button onClick={changeDistortion}>Distortion</Button>               
            </Flex> 
            <MusicVisualizer width={300} height={100}></MusicVisualizer>

        </Box>
    )
}