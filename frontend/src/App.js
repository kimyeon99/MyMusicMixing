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
import './css/sidebar.css';

const theme = extendTheme({
  fonts: {
    body: 'Hack',
    heading: 'Hack',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/playlist/:musicId" element={<PlayList/>}></Route>
        </Routes>
    </ChakraProvider>
  );
}

export default App;
