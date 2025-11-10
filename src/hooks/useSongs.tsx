import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Song } from "@/components/SongCard";

export const useSongs = (mood: string | null) => {
  return useQuery({
    queryKey: ["songs", mood],
    queryFn: async () => {
      if (!mood) return [];
      
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("mood", mood);

      if (error) {
        console.error("Error fetching songs:", error);
        throw error;
      }

      return data.map((song) => ({
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        imageUrl: song.image_url,
        audioUrl: song.audio_url,
      })) as Song[];
    },
    enabled: !!mood,
  });
};
