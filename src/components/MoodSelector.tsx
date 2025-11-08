import { Music2, Heart, Zap, Waves, Sparkles, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

export type MoodType = "happy" | "sad" | "energetic" | "calm" | "romantic" | "focus";

interface MoodOption {
  id: MoodType;
  label: string;
  icon: React.ReactNode;
  gradient: string;
}

const moods: MoodOption[] = [
  { id: "happy", label: "Happy", icon: <Music2 className="w-6 h-6" />, gradient: "bg-gradient-happy" },
  { id: "sad", label: "Sad", icon: <Waves className="w-6 h-6" />, gradient: "bg-gradient-sad" },
  { id: "energetic", label: "Energetic", icon: <Zap className="w-6 h-6" />, gradient: "bg-gradient-energetic" },
  { id: "calm", label: "Calm", icon: <Sparkles className="w-6 h-6" />, gradient: "bg-gradient-calm" },
  { id: "romantic", label: "Romantic", icon: <Heart className="w-6 h-6" />, gradient: "bg-gradient-romantic" },
  { id: "focus", label: "Focus", icon: <Brain className="w-6 h-6" />, gradient: "bg-gradient-focus" },
];

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
}

export const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
      {moods.map((mood) => (
        <Card
          key={mood.id}
          className={`relative cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow ${
            selectedMood === mood.id ? "ring-2 ring-primary shadow-glow" : ""
          }`}
          onClick={() => onMoodSelect(mood.id)}
        >
          <div className={`${mood.gradient} p-6 flex flex-col items-center justify-center gap-3 min-h-[120px]`}>
            <div className="text-white">{mood.icon}</div>
            <span className="text-white font-semibold text-sm">{mood.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
