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

const theme = extendTheme({
  fonts: {
    body: 'Hack',
    heading: 'Hack',
  },
});

function App() {

  const {user, setUser} = useAuth();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await authAxios.get('/auth/authCheck');
        console.log('response'+response);
        if (response.data) {
          setUser(response.data.user);
        }
      } catch (error) {
          console.log(`로그인 에러 ${error}`);
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
        </Routes>
    </ChakraProvider>
  );
}

export default App;
