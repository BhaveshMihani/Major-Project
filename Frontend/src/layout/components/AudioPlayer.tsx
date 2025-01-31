import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";
const AudioPlayer = () => {
  const audioref = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying } = usePlayerStore();

  // handle Play/Pause Logic
  useEffect(() => {
    if (isPlaying) audioref.current?.play();
    else audioref.current?.pause();
  }, [isPlaying]);

  // Handle Song End
  useEffect(() => {
    const audio = audioref.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song Changes

  useEffect(()=>{
    if(!audioref.current || !currentSong)  return;

    const audio = audioref.current;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if(isSongChange) audio.src = currentSong?.audioUrl;

    // reset the playback position

    audio.currentTime=0;

    prevSongRef.current = currentSong?.audioUrl;

    if(isPlaying) audio.play();
  },[currentSong,isPlaying])

  return <audio ref={audioref} />;
};

export default AudioPlayer;

function playNext() {
  throw new Error("Function not implemented.");
}
