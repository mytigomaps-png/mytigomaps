'use strict';
// Original Mystigo chime: two soft ascending notes, synthesized on the device.
// No audio is queued before the visitor interacts with the page.
const MystigoSound=(()=>{
  let context=null,unlocked=false,lastPlayed=-Infinity;
  const voices=new Set();
  const enabled=()=>state.notificationPrefs?.sound!==false;
  function stop(){for(const voice of voices){try{voice.stop();}catch{}}voices.clear();}
  async function unlock(){
    try{
      const AudioEngine=window.AudioContext||window.webkitAudioContext;
      if(!AudioEngine)return false;
      if(!context||context.state==='closed')context=new AudioEngine();
      if(context.state!=='running')await context.resume();
      unlocked=context.state==='running';
      return unlocked;
    }catch{return false;}
  }
  function prime(event){
    if(!event.isTrusted||!enabled()||document.visibilityState!=='visible')return;
    if(event.type==='keydown'&&(event.repeat||event.ctrlKey||event.metaKey||event.altKey))return;
    if(!unlocked||context?.state!=='running')void unlock();
  }
  async function play({preview=false}={}){
    if(document.visibilityState!=='visible'||!preview&&(!enabled()||!unlocked))return false;
    if(!preview&&Date.now()-lastPlayed<4000)return false;
    if(!await unlock())return false;
    if(document.visibilityState!=='visible'||!preview&&!enabled())return false;
    // Recheck after resume so several simultaneous notices produce one chime.
    if(!preview&&Date.now()-lastPlayed<4000)return false;
    try{
      stop();
      const start=context.currentTime+.015;
      [[659.25,0,.32],[830.61,.17,.48]].forEach(([frequency,offset,duration])=>{
        const voice=context.createOscillator(),volume=context.createGain(),at=start+offset;
        voice.type='sine';voice.frequency.setValueAtTime(frequency,at);
        volume.gain.setValueAtTime(0,at);
        volume.gain.linearRampToValueAtTime(.12,at+.018);
        volume.gain.exponentialRampToValueAtTime(.0001,at+duration);
        voice.connect(volume);volume.connect(context.destination);
        voice.onended=()=>{voices.delete(voice);voice.disconnect();volume.disconnect();};
        voices.add(voice);voice.start(at);voice.stop(at+duration+.015);
      });
      lastPlayed=Date.now();return true;
    }catch{stop();return false;}
  }
  document.addEventListener('pointerdown',prime,{capture:true,passive:true});
  document.addEventListener('keydown',prime,{capture:true});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState!=='visible')stop();});
  return {play,stop};
})();
