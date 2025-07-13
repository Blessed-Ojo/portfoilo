import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const error = req.nextUrl.searchParams.get('error')

  // Handle Spotify authorization errors
  if (error) {
    console.error('Spotify authorization error:', error)
    return NextResponse.json(
      { error: 'Authorization denied by user' }, 
      { status: 400 }
    )
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code not found' }, 
      { status: 400 }
    )
  }

  // Validate state parameter (implement your state validation logic)
  if (!state) {
    return NextResponse.json(
      { error: 'State parameter missing' }, 
      { status: 400 }
    )
  }

  // Check required environment variables
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/auth/callback/spotify'

  if (!client_id || !client_secret) {
    console.error('Missing Spotify credentials in environment variables')
    return NextResponse.json(
      { error: 'Server configuration error' }, 
      { status: 500 }
    )
  }

  try {
    const response = await axios.post(
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
        timeout: 10000, // 10 second timeout
      }
    )

    const { access_token, refresh_token, expires_in } = response.data

    // Store tokens securely (e.g., in database, secure cookie, etc.)
    // Instead of returning tokens directly, you might want to:
    // 1. Store in database linked to user session
    // 2. Set secure HTTP-only cookies
    // 3. Return success status and redirect

    // For now, returning success without exposing tokens
    return NextResponse.json({
      message: 'Spotify authentication successful!',
      expires_in,
      // Don't expose actual tokens in response
      // access_token: access_token, // Remove this
      // refresh_token: refresh_token, // Remove this
    })

  } catch (error: any) {
    // Better error handling
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const errorData = error.response?.data || {}
      
      console.error('Spotify API error:', {
        status: statusCode,
        data: errorData,
        message: error.message
      })

      // Don't expose internal API errors to client
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: statusCode >= 400 && statusCode < 500 ? 400 : 500 }
      )
    }

    console.error('Unexpected error during Spotify auth:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}