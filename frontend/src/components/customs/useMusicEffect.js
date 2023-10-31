import { usePlayList } from "./usePlayList";
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Pizzicato from 'pizzicato';

const MusicEffect = createContext();

export function useMusicEffect() {
    return useContext(MusicEffect);
}

export function MusicEffectProvider({ children }) {
    const { soundRef } = usePlayList();
    const [selectedEffect, setSeletedEffect] = useState('');

    function changeReverb() {
        const reverb = new Pizzicato.Effects.Reverb({
            time: 0.5,
            decay: 0.7,
            reverse: true,
            mix: 0.7
        });
        soundRef.current.addEffect(reverb);
    }

    function changeDelay() {
        const delay = new Pizzicato.Effects.Delay({
            feedback: 0.2,
            time: 0.1,
            mix: 0.3
        });
        soundRef.current.addEffect(delay);
    }

    function changeChorus() {
        const chorus = new Pizzicato.Effects.Chorus({
            rate: 1.5,
            feedback: 0.2,
            delay: 0.0045,
            depth: 0.7,
            mix: 0.5
        });

        soundRef.current.addEffect(chorus);
    }

    function changeDistortion() {
        const distortion = new Pizzicato.Effects.Distortion({
            gain: 0.1
        });

        soundRef.current.addEffect(distortion);
    }

    function changePan(){
        const pan = new Pizzicato.Effects.Distortion({
            pan: 0.5
        })

        soundRef.current.addEffect(pan);
    }

    return (
        <MusicEffect.Provider value={{
            changeReverb, changeDelay, changeChorus, changeDistortion, changePan
        }}>
            {children}
        </MusicEffect.Provider>
    );
}