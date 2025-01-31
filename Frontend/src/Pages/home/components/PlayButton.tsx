import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absoulte bottom-3 right-2 mr-1 bg-blue-400 hover:translate-y-0 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" fill="black" />
      ) : (
        <Play className="size-5 text-black" fill="black" />
      )}
    </Button>
  );
};

export default PlayButton;
