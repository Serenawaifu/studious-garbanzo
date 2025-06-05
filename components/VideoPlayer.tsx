// components/VideoPlayer.tsx

import React from 'react';
import { MuxPlayer } from '@mux/mux-player-react';

interface VideoPlayerProps {
  source: string; // Mux video URL
  title: string;
  episodeNumber: number;
  series: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source, title, episodeNumber, series }) => {
  return (
    <div className="relative">
      <MuxPlayer
        playbackId={source} // Use the Mux playback ID
        controls
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm">Episode {episodeNumber} - {series}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
