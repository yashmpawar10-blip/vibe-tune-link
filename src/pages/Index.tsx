import { useState, useRef } from "react";
import { Music } from "lucide-react";
import { MoodSelector, MoodType } from "@/components/MoodSelector";
import { SongCard, Song } from "@/components/SongCard";
import { useSongs } from "@/hooks/useSongs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const { data: songs = [], isLoading } = useSongs(selectedMood);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handlePlaySong = (song: Song) => {
    if (!song.audio_url) {
      toast({
        title: "No audio available",
        description: "This song doesn't have an audio file.",
        variant: "destructive",
      });
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(song.audio_url);
    audioRef.current.play();
    
    toast({
      title: "Now Playing",
      description: `${song.title} by ${song.artist}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">MoodTunes</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How are you feeling today?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your mood and discover the perfect soundtrack for your emotions
          </p>
        </div>

        {/* Mood Selector */}
        <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />

        {/* Songs Grid */}
        {selectedMood && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-semibold text-foreground mb-6 capitalize">
              {selectedMood} vibes
            </h3>
            {isLoading ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50 animate-pulse" />
                <p className="text-muted-foreground">Loading songs...</p>
              </div>
            ) : songs.length === 0 ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No songs found for this mood.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedMood && (
          <div className="text-center py-20">
            <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              Select a mood above to start discovering music
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
