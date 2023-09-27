import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Slideshow from './components/Slideshow';
import { Route, Routes } from 'react-router-dom';
import MusicPlayer from './components/customs/MusicPlayer';
import { usePlayList } from './components/customs/usePlayList';
import { useEffect, useState } from 'react';
import PlayList from './pages/PlayList';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Hack', // 원하는 폰트로 변경
    heading: 'Hack', // 원하는 폰트로 변경
    // 여기에 필요한 폰트 종류 추가
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/playlist" element={<PlayList/>}></Route>
        </Routes>
    </ChakraProvider>
  );
}

export default App;
