import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PlayListProvider} from '../src/components/customs/usePlayList'
import { BrowserRouter } from 'react-router-dom';
import { MusicEffectProvider } from './components/customs/useMusicEffect';
import { AuthProvider } from './components/customs/useAuth';
import { SWRConfig } from 'swr';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PlayListProvider>
    <MusicEffectProvider>
      <AuthProvider>
        <BrowserRouter>
          <SWRConfig value={{fetcher:async (url) => {
        try {
          const response = await axios.get(url);
          return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }}}}>
           <App />
          </SWRConfig>
        </BrowserRouter>
      </AuthProvider>
    </MusicEffectProvider>
  </PlayListProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
