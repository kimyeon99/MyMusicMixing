import baseImg from '../base_image.png';
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Center,
  Text,
  Spinner,
  ButtonSpinner
} from "@chakra-ui/react";
import '../../css/PlayModal.css';
import { usePlayList } from "./usePlayList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';


const PlayModal = ({ isModalOpen, openModal, closeModal}) => {
  const {selectedMusic, playToggleHandler, isPlaying, isLoading} = usePlayList();

  return (
    <div>
    {selectedMusic ? (
    <Modal isOpen={isModalOpen} onClose={closeModal} closeOnOverlayClick={false} isCentered>
    <ModalOverlay sx={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}/>
    <ModalContent borderRadius="30px" pt={0} color="blackAlpha.900">
      <ModalHeader borderBottomWidth="1px">
        <Text color="black">{selectedMusic.title}</Text>
        <Text color="black" fontSize='sm' pl="1">{selectedMusic.artist}</Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody color="blackAlpha.900">
        <Center>
          <img src={baseImg} alt="Album Cover" />
          {/* <Text color="black"></Text> */}
        </Center>
      </ModalBody>

      
      <Center>
      {isLoading ?
        <ModalFooter borderTopWidth="1px">
        <Button>
          <ButtonSpinner size="xl" color="blue.500" />
        </Button>
        </ModalFooter>
        : 
        <ModalFooter borderTopWidth="1px">
        <Button onClick={playToggleHandler} colorScheme="blue">
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause}/>
          ) : (
            <FontAwesomeIcon icon={faPlay}/>
          )}
        </Button>
        </ModalFooter>
      }
      </Center>
    </ModalContent>
  </Modal>
  ) : (<></>)}
  </div>
);
}

export default PlayModal;
