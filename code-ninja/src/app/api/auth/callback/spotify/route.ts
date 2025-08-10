import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

// Define types for better type safety
interface SpotifyTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
}

interface SpotifyErrorResponse {
  error: string
  error_description?: string
}

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
    const response = await axios.post<SpotifyTokenResponse>(
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

    const { expires_in } = response.data
    
    // Note: access_token and refresh_token are available in response.data
    // but are not used directly in this implementation for security reasons
    // They should be stored securely (database, secure cookies, etc.)
    
    // TODO: Implement secure token storage
    // Example implementations:
    // 1. Store in database: await storeTokensInDatabase(userId, response.data)
    // 2. Set secure cookies: setSecureCookies(response.data)
    // 3. Store in session: await storeInSession(sessionId, response.data)

    // For now, returning success without exposing tokens
    return NextResponse.json({
      message: 'Spotify authentication successful!',
      expires_in,
      // Tokens are intentionally not returned for security
    })

  } catch (error: unknown) {
    // Better error handling with proper typing
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const errorData = error.response?.data as SpotifyErrorResponse | undefined
      
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

    // Handle non-Axios errors
    if (error instanceof Error) {
      console.error('Unexpected error during Spotify auth:', error.message)
    } else {
      console.error('Unknown error during Spotify auth:', error)
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}