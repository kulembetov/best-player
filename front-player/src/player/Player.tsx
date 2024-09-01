"use client";

import { Maximize, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { SelectQuality } from "./SelectQuality";
import { usePlayer } from "./usePlayer";

export function Player() {
  const {
    changeQuality,
    isPlaying,
    playerRef,
    quality,
    skipTime,
    toggleFullScreen,
    togglePlayPause,
    currentTime,
    progress,
    videoTime,
    handleSeek,
  } = usePlayer();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <div className="w-full h-full max-w-4xl max-h-full relative rounded-3xl overflow-hidden flex flex-col">
        <video
          ref={playerRef}
          className="w-full h-full object-cover"
          controls={false}
          src="/uploads/1080p/1725100979901-518889793.mp4#t=9"
          preload="metadata"
          onClick={togglePlayPause}
        />

        <div className="flex items-center justify-between p-4 pt-6 bg-dark-700 relative z-10">
          <ProgressBar progress={progress} onSeek={handleSeek} />
          <div className="flex items-center gap-5">
            <button onClick={togglePlayPause} className="hoverPrimary">
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => skipTime("backward")}
                className="hoverPrimary"
              >
                <RotateCcw />
              </button>
              <button
                onClick={() => skipTime("forward")}
                className="hoverPrimary"
              >
                <RotateCw />
              </button>
            </div>

            <div className="flex items-center gap-1 border-l pl-3 border-white/50">
              <span>
                {Math.floor(currentTime / 60) +
                  ":" +
                  ("0" + Math.floor(currentTime % 60)).slice(-2)}
              </span>
              <span>/</span>
              <span>
                {Math.floor(videoTime / 60) +
                  ":" +
                  ("0" + Math.floor(videoTime % 60)).slice(-2)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <SelectQuality currentValue={quality} onChange={changeQuality} />
            <button onClick={toggleFullScreen} className="hoverPrimary">
              <Maximize />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
