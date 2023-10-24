import { useEffect } from 'react';
import p5 from 'p5';
import { usePlayList } from './customs/usePlayList';

const Sketch = () => {
  const {soundRef} = usePlayList();
  let canvas;
  let spectrum;
  
  let sketch = (p) => {

    p.setup = () => {
      canvas = p.createCanvas(400, 400);
    };

    p.draw = () => {
      if (soundRef.current && soundRef.current.analyserNode) {
        if (!spectrum || spectrum.length !== soundRef.current.analyserNode.frequencyBinCount) {
          spectrum = new Uint8Array(soundRef.current.analyserNode.frequencyBinCount);
        }
        
        soundRef.current.analyserNode.getByteFrequencyData(spectrum);
        p.clear(); // Clear previous frame
        for (let i = 0; i < spectrum.length; i++) {
          const x = p.map(i, 0, spectrum.length, 0, p.width); 
          const h = -p.height + p.map(spectrum[i], 0, 255 , p.height , 0); 
          p.rect(x ,p.height ,p.width / spectrum.length ,h );
       }
     }
   };
 };

 useEffect(() => {

   let myP5Instance= new p5(sketch);

   return ()=>{ 
     myP5Instance.remove(); 
   }

 }, []); 

 return (
   <div id="sketch-holder" style={{width: '400px', height: '400px', zIndex:'9999'}}></div>
 );
};

export default Sketch;
