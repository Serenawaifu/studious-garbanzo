// components/VideoPlayer.tsx

import React from 'react';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

interface VideoPlayerProps {
  source: string;
  title: string;
  episodeNumber: number;
  series: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source, title, episodeNumber, series }) => {
  const proxiedSource = `/api/proxy?url=${encodeURIComponent(source)}`;

  return (
    <div className="relative">
      <Player
        playsInline
        src={proxiedSource}
        fluid={false}
        width="100%"
        height="auto"
      >
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm">Episode {episodeNumber} - {series}</p>
        </div>
      </Player>
    </div>
  );
};

export default VideoPlayer;
