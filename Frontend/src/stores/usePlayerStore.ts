import { create } from "zustand";
import { Song } from "@/types";

interface Playerstore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  sections: Song[][];
  currentSectionIndex: number;

  initializeQueue: (sections: Song[][]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<Playerstore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  sections: [],
  currentSectionIndex: 0,

  initializeQueue: (sections: Song[][]) => {
    const allSongs = sections.flat();
    set({
      sections: sections,
      queue: allSongs,
      currentSong: get().currentSong || allSongs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    set({
      isPlaying: willStartPlaying,
    });
  },
  playNext: () => {
    const { currentIndex, queue, sections, currentSectionIndex } = get();
    let nextIndex = currentIndex + 1;
    let newSectionIndex = currentSectionIndex;

    if (nextIndex >= queue.length) {
      newSectionIndex = (currentSectionIndex + 1) % sections.length;
      nextIndex = 0;
    }

    set({
      currentSong: queue[nextIndex],
      currentIndex: nextIndex,
      currentSectionIndex: newSectionIndex,
      isPlaying: true,
    });
  },
  playPrevious: () => {
    const { currentIndex, queue, sections, currentSectionIndex } = get();
    let previousIndex = currentIndex - 1;
    let newSectionIndex = currentSectionIndex;

    if (previousIndex < 0) {
      newSectionIndex =
        (currentSectionIndex - 1 + sections.length) % sections.length;
      previousIndex = queue.length - 1;
    }

    set({
      currentSong: queue[previousIndex],
      currentIndex: previousIndex,
      currentSectionIndex: newSectionIndex,
      isPlaying: true,
    });
  },
}));
