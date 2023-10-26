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
    const { isSideMusic, toggleIsSideMusic, selectedMusic } = usePlayList();

    return (
        <Box
            w={isSideMusic ? '26%' : '0'}
            h="100%"
            bg="#181818"
            color="white"
            overflowX="hidden"
            zIndex="9999"
            textAlign="center"
            position="fixed"
            top="0"
            right="0"
        >


            <Button
                position="fixed"
                bottom="2%"
                right="1%"
                onClick={toggleIsSideMusic}
                bgColor="green.300"
                size={'sm'}
            >
                👻
            </Button>

            {selectedMusic ?
                <Box>
                    <Center>
                        <Box>
                            <Heading pt="20px">{selectedMusic.title}</Heading>
                            <Text pt="5px">{selectedMusic.artist}</Text>
                        </Box>
                    </Center>
                    <Center>
                        <Img p="20px" src={selectedMusic.img}></Img>
                    </Center>

                    <Box>
                        <Center>
                            <Equalizers></Equalizers>
                        </Center>
                    </Box>
                    {/* <Center>
                    <MusicVisualizer width={300} height={100}></MusicVisualizer>
                </Center> */}

                </Box>
                : <Heading p="20px">library</Heading>
            }
        </Box>
    );
}

export default SideMusic;


const Equalizers = () => {
    const { changeReverb, changeDelay, changeChorus, changeDistortion } = useMusicEffect();

    return (
        <Box>
            <Text mb={-7}>Customs</Text>
            <Flex gap={3} w={"100%"} flexWrap={wrap} pb={3} pt={10}>
                <Button onClick={changeReverb}>Concert</Button>
                <Button onClick={changeDelay}>Delay</Button>
                <Button onClick={changeDistortion}>Distortion</Button>
            </Flex>
            <Flex gap={3} w={"100%"} flexWrap={wrap}>
                {/* <Button onClick={changeChorus}>Chorus</Button> */}
            </Flex>

        </Box >
    )
}