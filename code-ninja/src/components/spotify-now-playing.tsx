"use client";
import React, { useEffect, useState } from "react";

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[]; name: string; release_date: string };
  external_urls: { spotify: string };
  isPlaying?: boolean;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading , setIsLoading]= useState(true);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify/now-playing");

        if (res.status === 204) {
          setTrack(null);
          setError(null);
          setIsVisible(false);
          setIsLoading(false);
          return;
        }

        if (res.ok) {
          const data = await res.json();

          if (data.error) {
            setError(data.error);
            setTrack(null);
            setIsVisible(false);
            setIsLoading(false);
          } else {
            setTrack(data);
            setError(null);
            setIsVisible(true);
            setIsLoading(false);
          }
        } else {
          const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
          setError(errorData.error || 'Failed to fetch Spotify data');
          setTrack(null);
          setIsVisible(false);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Spotify fetch error:', err);
        setError('Network error');
        setTrack(null);
        setIsVisible(false);
        setIsLoading(false);
      }
    }

    fetchTrack();
    const interval = setInterval(fetchTrack, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 300); // 300ms delay
    setHoverTimeout(timeout);
  };

  const containerBaseStyles = `
    fixed bottom-6 right-6 z-50 
    transition-all duration-500 ease-out
    text-sm max-w-[280px]
  `;

  const panelBaseStyles = `
    relative flex items-center gap-3
    border backdrop-blur-md px-4 py-3 rounded-2xl
    shadow-2xl transition-all duration-300 ease-out
  `;

  if (isLoading) {
    return (
      <div className={containerBaseStyles}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-purple-900/10 to-indigo-900/20 rounded-2xl blur-xl transform scale-110 animate-pulse dark:from-white/20 dark:via-green-100/10 dark:to-blue-100/20" />
        <div className={`${panelBaseStyles} bg-white dark:bg-gradient-to-br dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 border-gray-300 dark:border-slate-700/50 text-gray-900 dark:text-slate-100`}>
          {/* Loading Spinner and Text */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-600">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="text-green-500 animate-spin"
            >
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div className="flex flex-col ml-3">
            <span className="font-mono text-xs text-green-600 dark:text-green-400 font-bold tracking-wider animate-pulse">🔍 SCANNING</span>
            <span className="font-semibold mt-1">Infiltrating Spotify...</span>
            <span className="text-xs text-gray-600 dark:text-slate-400">Decrypting tracks...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) return null;

  return (
    <div className={`${containerBaseStyles} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      {/* Hover Tooltip */}
      {showTooltip && (
        <div 
          className="absolute bottom-full right-0 mb-2 w-80 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-2xl p-4 z-60 transform transition-all duration-300 ease-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex gap-4">
            <img
              src={track.album.images[1]?.url || track.album.images[0]?.url}
              alt={track.album.name}
              className="w-16 h-16 rounded-lg border border-gray-200 dark:border-slate-600"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-gray-900 dark:text-slate-100 mb-1 truncate">{track.name}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-2 truncate">
                by {track.artists.map((a) => a.name).join(", ")}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-500 mb-1 truncate">
                Album: {track.album.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-500 mb-3">
                Released: {new Date(track.album.release_date).getFullYear()}
              </p>
              <a 
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                 Open in Spotify ↗
                  </a>
            </div>
          </div>
        </div>
      )}
      
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${panelBaseStyles} bg-white dark:bg-gradient-to-br dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 border-gray-300 dark:border-slate-700/50 text-gray-900 dark:text-slate-100 hover:shadow-green-300 dark:hover:shadow-green-900/30 hover:scale-105 group`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-400/10 dark:bg-green-400/20 rounded-lg blur-md animate-pulse" />
          <img
            src={track.album.images[2]?.url || track.album.images[0]?.url}
            alt={track.name}
            className="relative w-10 h-10 rounded-lg border border-gray-300 dark:border-slate-600"
          />
          {track.isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>

        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="font-mono text-xs text-green-600 dark:text-green-400 font-bold tracking-wider">{track.isPlaying ? "▶ PLAYING" : "⏸ LAST PLAYED"}</span>
          <span className="font-semibold text-sm truncate w-full mt-1">{track.name}</span>
          <span className="text-xs truncate w-full font-mono text-gray-600 dark:text-slate-400">{track.artists.map((a) => a.name).join(" • ")}</span>
        </div>

        <div className="text-gray-400 dark:text-slate-500 group-hover:text-green-500 group-hover:rotate-45 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
          </svg>
        </div>
      </a>
    </div>
  );
}