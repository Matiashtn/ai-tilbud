// middleware.js
import { NextResponse } from 'next/server'

const BASIC_AUTH_USER = 'admin'
const BASIC_AUTH_PASS = 'hemmeligkode'

export function middleware(request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const base64 = authHeader.split(' ')[1]
    const [user, pass] = atob(base64).split(':')

    if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Adgang nægtet', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Beskyttet område"',
    },
  })
}
