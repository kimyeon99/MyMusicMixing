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
import Login from './pages/Login';
import { useAuth } from './components/customs/useAuth';
import authAxios from './components/customs/authAxios';
import MypagePlaylist from './pages/Mypage.js/MypagePlaylist';

const theme = extendTheme({
  fonts: {
    body: 'Gotham-Thin',
    heading: 'Gotham-Thin',
  },
  fontSizes: {
    body: '14px',
    heading: '16px',
  },
  fontColor: {
    body: 'white',
  }
});

function App() {

  const {user, login} = useAuth();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await authAxios.post('/auth/authCheck');
        if (response.data) {
          login(response.data);
        }
      } catch (error) {
          console.log(`유저 정보 없음: ${error}`);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/playlist/:musicId" element={<PlayList/>}></Route>
          <Route path="/mypage/playlist" element={<MypagePlaylist/>}></Route>
        </Routes>
    </ChakraProvider>
  );
}

export default App;
