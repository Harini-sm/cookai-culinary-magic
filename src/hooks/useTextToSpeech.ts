
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const stopPlaying = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playText = async (text: string) => {
    try {
      if (isPlaying) {
        stopPlaying();
        return;
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text },
      });

      if (error) throw error;

      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        setAudioElement(audio);

        audio.onended = () => {
          setIsPlaying(false);
        };

        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          setIsPlaying(false);
          toast.error('Failed to play audio');
        };

        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to generate speech');
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    playText,
    stopPlaying,
  };
};
