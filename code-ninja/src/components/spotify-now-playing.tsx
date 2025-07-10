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
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);
if (isLoading) {
  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out">
      {/* Ninja Stealth Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-purple-900/10 to-indigo-900/20 rounded-2xl blur-xl transform scale-110 animate-pulse" />
      
      <div className={`
        relative flex items-center gap-3
        bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
        border border-slate-700/50 backdrop-blur-md
        text-slate-100 px-4 py-3 rounded-2xl 
        shadow-2xl shadow-black/50
        text-sm max-w-[280px]
      `}>
        {/* Spinning Shuriken Loader */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-400/20 rounded-lg blur-md animate-pulse" />
          <div className="relative w-10 h-10 flex items-center justify-center bg-slate-800 rounded-lg border border-slate-600/50">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="text-green-400 animate-spin"
            >
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <div className="flex items-center gap-2 w-full">
            <span className="font-mono text-xs text-green-400 font-bold tracking-wider animate-pulse">
              🔍 SCANNING
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
          </div>
          <span className="font-semibold text-sm text-slate-100 mt-1">
            Infiltrating Spotify...
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-mono mt-1">
            <span>Decrypting tracks</span>
            <span className="animate-pulse">
              <span className="animate-ping">.</span>
              <span className="animate-ping delay-75">.</span>
              <span className="animate-ping delay-150">.</span>
            </span>
          </div>
        </div>
        
        {/* Pulsing Data Stream Effect */}
        <div className="flex flex-col gap-1">
          <div className="w-2 h-1 bg-green-400/60 rounded animate-pulse"></div>
          <div className="w-2 h-1 bg-green-400/40 rounded animate-pulse delay-100"></div>
          <div className="w-2 h-1 bg-green-400/20 rounded animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
}
  if (error || !track) {
    return null;
  }

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
    >
      {/* Ninja Stealth Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-purple-900/10 to-indigo-900/20 rounded-2xl blur-xl transform scale-110 animate-pulse" />
      
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          relative flex items-center gap-3
          bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
          border border-slate-700/50 backdrop-blur-md
          text-slate-100 px-4 py-3 rounded-2xl 
          shadow-2xl shadow-black/50
          hover:shadow-purple-900/30 hover:shadow-2xl
          hover:border-purple-500/30
          focus:outline-none focus:ring-2 focus:ring-purple-400/50
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          text-sm max-w-[280px]
          group
        `}
        aria-label={`Now playing: ${track.name} by ${track.artists
          .map((a) => a.name)
          .join(", ")}`}
        title={`Now playing: ${track.name} by ${track.artists
          .map((a) => a.name)
          .join(", ")}`}
      >
        {/* Spotify Logo Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-400/20 rounded-lg blur-md animate-pulse" />
          <img
            src={track.album.images[2]?.url || track.album.images[0]?.url}
            alt={track.name}
            className="relative w-10 h-10 rounded-lg border border-slate-600/50 shadow-lg"
          />
          {/* Playing Indicator */}
          {track.isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          )}
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <div className="flex items-center gap-2 w-full">
            <span className="font-mono text-xs text-green-400 font-bold tracking-wider">
              {track.isPlaying ? "▶ PLAYING" : "⏸ RECENT"}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
          </div>
          <span className="font-semibold text-sm truncate w-full text-slate-100 mt-1">
            {track.name}
          </span>
          <span className="text-xs text-slate-400 truncate w-full font-mono">
            {track.artists.map((a) => a.name).join(" • ")}
          </span>
        </div>
        
        {/* Ninja Shuriken Icon */}
        <div className="text-slate-500 group-hover:text-green-400  group-hover:rotate-45 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
          </svg>
        </div>
      </a>
      
      {/* Ninja Tooltip */}
      <div
        className={`
          absolute bottom-16 right-0 w-72 max-w-[90vw]
          ${
            showTooltip
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
          transition-all duration-300 ease-out
        `}
        style={{ zIndex: 100 }}
      >
        {/* Stealth Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-purple-900/20 to-indigo-900/30 rounded-2xl blur-xl transform scale-110" />
        
        <div className={`
            relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
            border border-slate-700/50 backdrop-blur-md
            rounded-2xl shadow-2xl shadow-black/60 p-4
            flex flex-col gap-3
          `}>
          {/* Header with Ninja Divider */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-xl blur-sm" />
              <img
                src={track.album.images[1]?.url || track.album.images[0]?.url}
                alt={track.album.name}
                className="relative w-12 h-12 rounded-xl border border-slate-600/50 shadow-lg"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-slate-100 truncate mb-1">
                {track.name}
              </div>
              <div className="text-xs text-slate-400 truncate font-mono">
                {track.artists.map((a) => a.name).join(" • ")}
              </div>
            </div>
          </div>
          
          {/* Ninja Data Grid */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center py-1 border-b border-slate-700/30">
              <span className="text-green-400 font-bold">ALBUM:</span>
              <span className="text-slate-300 truncate ml-2 max-w-[60%]">{track.album.name}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-700/30">
              <span className="text-green-400 font-bold">RELEASE:</span>
              <span className="text-slate-300">{track.album.release_date}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-green-400 font-bold">STATUS:</span>
              <span className={`font-bold ${track.isPlaying ? 'text-green-400' : 'text-orange-400'}`}>
                {track.isPlaying ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
          </div>
          
          {/* Ninja Action Button */}
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              mt-2 px-4 py-2 rounded-xl
              bg-gradient-to-r from-green-600 to-green-500
              hover:from-green-500 hover:to-green-400
              text-white font-mono text-xs font-bold
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-95
              shadow-lg shadow-green-900/50
              hover:shadow-green-500/30
              flex items-center justify-center gap-2
              group
            `}
          >
            <span>INFILTRATE SPOTIFY</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}