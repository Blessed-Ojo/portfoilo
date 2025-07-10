import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No code found in query' }, { status: 400 })
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID!
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirect_uri = 'http://127.0.0.1:3000/api/auth/callback/spotify'

  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const { access_token, refresh_token, expires_in } = res.data

    return NextResponse.json({
      message: 'Spotify Auth successful!',
      access_token,
      refresh_token,
      expires_in,
    })
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    return NextResponse.json(
      { error: 'Failed to get tokens from Spotify' },
      { status: 500 }
    )
  }
}
