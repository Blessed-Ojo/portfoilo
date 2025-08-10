import {  NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

// Cache for access token to avoid repeated requests
let tokenCache: { token: string; expires: number } | null = null;

async function getAccessToken() {
  try {
    // Check if we have a valid cached token
    if (tokenCache && Date.now() < tokenCache.expires) {
      return { access_token: tokenCache.token };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // Increased to 15 seconds

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token.trim(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify token error:", response.status, errorText);
      throw new Error(
        `Failed to get access token: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    
    // Cache the token (expires in 1 hour, cache for 50 minutes to be safe)
    tokenCache = {
      token: data.access_token,
      expires: Date.now() + (50 * 60 * 1000)
    };

    return data;
  } catch (error) {
    console.error("Token request failed:", error);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Token request timed out');
    }
    throw error;
  }
}

async function fetchWithTimeout(url: string, options: RequestInit, timeout: number = 12000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

export async function GET() {
  try {
    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json(
        {
          spotify: null,
          error: "Missing Spotify configuration",
        },
        { status: 500 }
      );
    }

    const { access_token } = await getAccessToken();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };

    // Try to get currently playing track first
    let currentlyPlayingRes;
    try {
      currentlyPlayingRes = await fetchWithTimeout(
        "https://api.spotify.com/v1/me/player/currently-playing",
        { headers },
        12000 // Increased timeout to 12 seconds
      );
    } catch (error) {
      console.error("Currently playing request failed:", error);
      // If currently playing fails, try recently played immediately
      return await getRecentlyPlayed(headers);
    }

    // Handle different response statuses properly
    if (currentlyPlayingRes.status === 204) {
      // No content - nothing is playing, try recently played
      return await getRecentlyPlayed(headers);
    }

    if (currentlyPlayingRes.status === 401) {
      // Unauthorized - token might be invalid, clear cache and try recently played
      tokenCache = null;
      return await getRecentlyPlayed(headers);
    }

    if (currentlyPlayingRes.status === 429) {
      // Rate limited
      const retryAfter = currentlyPlayingRes.headers.get('Retry-After');
      return NextResponse.json(
        {
          spotify: null,
          error: `Rate limited. Try again in ${retryAfter || '60'} seconds`,
        },
        { status: 429 }
      );
    }

    if (!currentlyPlayingRes.ok) {
      // Other errors
      const errorText = await currentlyPlayingRes.text();
      console.error("Currently playing error:", currentlyPlayingRes.status, errorText);
      return await getRecentlyPlayed(headers);
    }

    // Parse JSON only if we have a successful response
    const data = await currentlyPlayingRes.json();
    
    if (data && data.item) {
      return NextResponse.json({
        name: data.item.name,
        artists: data.item.artists,
        album: data.item.album,
        external_urls: data.item.external_urls,
        isPlaying: data.is_playing,
      });
    }

    // If no item in response, try recently played
    return await getRecentlyPlayed(headers);

  } catch (error) {
    console.error("Spotify API error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Failed to get access token") || error.message.includes("Token request timed out")) {
        return NextResponse.json(
          {
            spotify: null,
            error: "Authentication failed - check your Spotify credentials",
          },
          { status: 401 }
        );
      }
      
      if (error.message.includes("timed out")) {
        return NextResponse.json(
          {
            spotify: null,
            error: "Request timed out - Spotify API is slow",
          },
          { status: 408 }
        );
      }
    }

    return NextResponse.json(
      { spotify: null, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getRecentlyPlayed(headers: Record<string, string>) {
  try {
    const recentlyPlayedRes = await fetchWithTimeout(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers },
      12000 // Increased timeout to 12 seconds
    );

    if (recentlyPlayedRes.status === 204) {
      return NextResponse.json(
        { spotify: null, error: "No music activity found" },
        { status: 204 }
      );
    }

    if (recentlyPlayedRes.status === 401) {
      // Clear token cache on auth error
      tokenCache = null;
      return NextResponse.json(
        {
          spotify: null,
          error: "Authentication failed - token may be expired",
        },
        { status: 401 }
      );
    }

    if (recentlyPlayedRes.status === 429) {
      // Rate limited
      const retryAfter = recentlyPlayedRes.headers.get('Retry-After');
      return NextResponse.json(
        {
          spotify: null,
          error: `Rate limited. Try again in ${retryAfter || '60'} seconds`,
        },
        { status: 429 }
      );
    }

    if (!recentlyPlayedRes.ok) {
      const errorText = await recentlyPlayedRes.text();
      console.error("Recently played error:", recentlyPlayedRes.status, errorText);
      return NextResponse.json(
        {
          spotify: null,
          error: `Failed to fetch recently played: ${recentlyPlayedRes.status}`,
        },
        { status: 500 }
      );
    }

    const data = await recentlyPlayedRes.json();
    const track = data.items?.[0]?.track;

    if (!track) {
      return NextResponse.json(
        { spotify: null, error: "No recent tracks found" },
        { status: 204 }
      );
    }

    return NextResponse.json({
      name: track.name,
      artists: track.artists,
      album: track.album,
      external_urls: track.external_urls,
      isPlaying: false,
    });
  } catch (error) {
    console.error("Recently played request failed:", error);
    
    if (error instanceof Error && error.message.includes("timed out")) {
      return NextResponse.json(
        {
          spotify: null,
          error: "Recently played request timed out",
        },
        { status: 408 }
      );
    }

    return NextResponse.json(
      {
        spotify: null,
        error: "Failed to fetch recently played",
      },
      { status: 500 }
    );
  }
}