import { NextResponse } from 'next/server'

export function middleware(request) {
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'admin' && pwd === 'kode123') {
      return NextResponse.next()
    }
  }

  const response = new NextResponse()
  response.headers.set('WWW-Authenticate', 'Basic realm="Adgang til ai-tilbud.dk"')
  response.status = 401
  return response
}

export const config = {
  matcher: ['/', '/(.*)'], // beskyt hele sitet
}
