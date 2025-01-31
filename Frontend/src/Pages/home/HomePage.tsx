import TopBar from "@/components/ui/TopBar";
import { useMusicStore } from "@/stores/useMusicStores";
import { useEffect, useState } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYou,
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    if (
      trendingSongs.length > 0 &&
      featuredSongs.length > 0 &&
      madeForYouSongs.length > 0
    ) {
      const sections = [madeForYouSongs, trendingSongs, featuredSongs];
      initializeQueue(sections);
    }
  }, [initializeQueue, featuredSongs, madeForYouSongs, trendingSongs]);

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYou();
  }, [fetchFeaturedSongs, fetchMadeForYou, fetchTrendingSongs]);

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">{greeting}</h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made for You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
