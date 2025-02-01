import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { Stats } from "@/types";
import { create } from "zustand";

interface MusiceStore {
  albums: Song[];
  songs: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  stats:Stats

  fetchAlbums: () => Promise<void>;
  fetchAlbumsById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYou: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats:()=> Promise<void>
  fetchSongs:()=> Promise<void>
}

export const useMusicStore = create<MusiceStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  stats:{
    totalAlbums:0,
    totalSongs:0,
    totalArtists:0,
    totalUsers: 0,
    },

    fetchSongs: async () => {
      set({isLoading:true, error:null})
      try{
        const response = await axiosInstance.get("/songs")
        set({albums: response.data, isLoading: false})
      }
      catch(error:any){
        set({error:error.response.data.Message})
      }
      finally{
        set({isLoading:false});
      }
    },
    fetchStats: async () => {
      set({isLoading:true, error:null})
      try{
        const response = await axiosInstance.get("/stats")
        set({albums: response.data, isLoading: false})
      }
      catch(error:any){
        set({error:error.response.data.Message})
      }
      finally{
        set({isLoading:false});
      }
    },

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response.data.Message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumsById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.Message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.Message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYou: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.Message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.Message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
