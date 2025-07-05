// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const basicAuth = request.headers.get('authorization')

  const USER = 'admin'
  const PASS = 'kode123'

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(' ')

    if (scheme === 'Basic') {
      const buff = Buffer.from(encoded, 'base64')
      const [user, pass] = buff.toString().split(':')

      if (user === USER && pass === PASS) {
        return NextResponse.next()
      }
    }
  }

  return new Response('Adgangskode påkrævet', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Beskyttet område"',
    },
  })
}

// Denne konfiguration bestemmer hvilke sider der beskyttes
export const config = {
  matcher: ['/', '/(.*)'], // Beskytter hele appen
}

  })
}
