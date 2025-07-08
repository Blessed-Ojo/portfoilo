import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

async function getAccessToken() {
  try {
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
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify token error:", response.status, errorText);
      throw new Error(
        `Failed to get access token: ${response.status} - ${errorText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Token request failed:", error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
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

    let res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 30 },
      }
    );

    // If nothing is currently playing (204) or unauthorized (401), try recently played
    if (res.status === 204 || res.status === 401) {
      res = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.status === 204) {
        return NextResponse.json(
          { spotify: null, error: "No music activity found" },
          { status: 204 }
        );
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Recently played error:", res.status, errorText);
        return NextResponse.json(
          {
            spotify: null,
            error: `Failed to fetch recently played: ${res.status}`,
          },
          { status: 500 }
        );
      }

      const data = await res.json();
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
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Currently playing error:", res.status, errorText);
      return NextResponse.json(
        {
          spotify: null,
          error: `Failed to fetch current track: ${res.status}`,
        },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.item) {
      return NextResponse.json(
        { spotify: null, error: "No track data available" },
        { status: 204 }
      );
    }

    return NextResponse.json({
      name: data.item.name,
      artists: data.item.artists,
      album: data.item.album,
      external_urls: data.item.external_urls,
      isPlaying: data.is_playing,
    });
  } catch (error) {
    console.error("Spotify API error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Failed to get access token")) {
        return NextResponse.json(
          {
            spotify: null,
            error: "Authentication failed - check your Spotify credentials",
          },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { spotify: null, error: "Internal server error" },
      { status: 500 }
    );
  }
}