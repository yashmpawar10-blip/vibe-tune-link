import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  image_url: string;
  audio_url: string;
}

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
}

export const SongCard = ({ song, onPlay }: SongCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-glow hover:shadow-primary/20">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={song.image_url}
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="icon"
            className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
            onClick={() => onPlay(song)}
          >
            <Play className="w-6 h-6 fill-primary-foreground" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1">{song.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        <p className="text-xs text-muted-foreground truncate mt-1">{song.album}</p>
      </div>
    </Card>
  );
};
