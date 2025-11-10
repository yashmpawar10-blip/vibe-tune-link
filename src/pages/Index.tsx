import { useState } from "react";
import { Music } from "lucide-react";
import { MoodSelector, MoodType } from "@/components/MoodSelector";
import { SongCard, Song } from "@/components/SongCard";
import { mockSongs } from "@/data/mockSongs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handlePlaySong = (song: Song) => {
    const searchQuery = encodeURIComponent(`${song.title} ${song.artist}`);
    const youtubeMusicUrl = `https://music.youtube.com/search?q=${searchQuery}`;
    window.open(youtubeMusicUrl, '_blank');
    
    toast({
      title: "Opening YouTube Music",
      description: `${song.title} by ${song.artist}`,
    });
  };

  const displayedSongs = selectedMood ? mockSongs[selectedMood] : [];

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedSongs.map((song) => (
                <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
              ))}
            </div>
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
