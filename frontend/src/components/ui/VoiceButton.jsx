import React from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';

export default function VoiceButton({ onTranscript, className = '' }) {
  const { isRecording, isTranscribing, toggleRecording } = useVoiceRecorder({
    onTranscribeSuccess: (text) => onTranscript(text),
    onError: (msg) => alert(msg),
  });

  return (
    <button
      type="button"
      onClick={toggleRecording}
      disabled={isTranscribing}
      title={
        isTranscribing
          ? 'Transcribing with Groq AI...'
          : isRecording
          ? 'Stop recording'
          : 'Speak to dictate'
      }
      className={`p-2 rounded-xl transition-all duration-200 focus:outline-none flex items-center justify-center ${
        isRecording
          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
          : isTranscribing
          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 cursor-wait'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
      } ${className}`}
    >
      {isTranscribing ? (
        <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
      ) : isRecording ? (
        <Square className="w-4 h-4 fill-current text-rose-400" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}