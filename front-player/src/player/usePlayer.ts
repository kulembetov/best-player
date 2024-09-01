import { useEffect, useRef, useState } from "react";
import { EnumPlayerQuality, HTMLCustomVideoElement } from "./player.types";

const SKIP_TIME_SECONDS = 15;

export function usePlayer() {
  const playerRef = useRef<HTMLCustomVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState(EnumPlayerQuality["1080p"]);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsPlaying(!playerRef.current?.paused);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current) {
        const current = playerRef.current.currentTime;
        const duration = playerRef.current.duration;
        setCurrentTime(current);
        setProgress((current / duration) * 100);
      }
    };

    const player = playerRef.current;
    player?.addEventListener("timeupdate", updateProgress);

    return () => {
      player?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (type?: "forward" | "backward") => {
    if (!playerRef.current?.currentTime) return;

    if (type === "forward") {
      playerRef.current.currentTime += SKIP_TIME_SECONDS;
    } else {
      playerRef.current.currentTime -= SKIP_TIME_SECONDS;
    }
    setCurrentTime(playerRef.current.currentTime);
    setProgress(
      (playerRef.current.currentTime / playerRef.current.duration) * 100,
    );
  };

  const toggleFullScreen = () => {
    if (!playerRef.current) return;

    if (playerRef.current.requestFullscreen) {
      playerRef.current.requestFullscreen();
    } else if (playerRef.current?.mozRequestFullScreen) {
      playerRef.current.mozRequestFullScreen();
    } else if (playerRef.current.webkitRequestFullscreen) {
      playerRef.current.webkitRequestFullscreen();
    } else if (playerRef.current.msRequestFullscreen) {
      playerRef.current.msRequestFullscreen();
    }
  };

  const changeQuality = (quality: EnumPlayerQuality) => {
    if (!playerRef.current) return;
    setQuality(quality);

    playerRef.current.src = `/uploads/${quality}/1725100979901-518889793.mp4`;
    playerRef.current.currentTime = currentTime;
    playerRef.current.play();
    setIsPlaying(true);
  };

  const handleSeek = (percentage: number) => {
    if (playerRef.current) {
      const newTime = (percentage / 100) * playerRef.current.duration;
      playerRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage);
    }
  };

  useEffect(() => {
    const originalTime = playerRef.current?.duration;
    if (originalTime) {
      setVideoTime(originalTime);
      const currentTime = playerRef.current.currentTime;
      const duration = playerRef.current.duration;
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
  }, [playerRef.current?.duration]);

  return {
    playerRef,
    isPlaying,
    quality,
    togglePlayPause,
    skipTime,
    toggleFullScreen,
    changeQuality,
    progress,
    currentTime,
    videoTime,
    handleSeek,
  };
}
