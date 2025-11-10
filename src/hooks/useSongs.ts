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

      if (error) throw error;

      return data as Song[];
    },
    enabled: !!mood,
  });
};
