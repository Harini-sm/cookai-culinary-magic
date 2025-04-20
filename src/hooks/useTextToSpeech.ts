
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

  // Fallback using Web Speech API
  const useBrowserSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Speech synthesis not supported in this browser');
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        toast.error('Browser speech synthesis failed');
      };

      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      return true;
    } catch (error) {
      console.error('Browser speech synthesis error:', error);
      return false;
    }
  };

  const playText = async (text: string) => {
    try {
      if (isPlaying) {
        stopPlaying();
        window.speechSynthesis?.cancel();
        return;
      }

      const { data, error, status } = await supabase.functions.invoke('text-to-speech', {
        body: { text },
      });

      // Check for quota exceeded or other errors
      if (error || !data.audioContent) {
        console.error('Text-to-speech API error:', error || data.error);
        
        // If quota exceeded, try browser speech synthesis
        if (status === 402 || data.fallback) {
          toast.warning('Using browser speech synthesis due to API quota limits');
          if (!useBrowserSpeech(text)) {
            throw new Error('Both API and browser speech synthesis failed');
          }
          return;
        }
        
        throw error || new Error(data.error || 'Failed to generate speech');
      }

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
          
          // Try fallback on audio playback error
          useBrowserSpeech(text);
        };

        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to generate speech');
      
      // Try browser speech as last resort
      useBrowserSpeech(text);
    }
  };

  return {
    isPlaying,
    playText,
    stopPlaying,
  };
};
