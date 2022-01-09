import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Isub {
  sub: string
}

export default function CommentValidated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const Authenticated = request.headers.authorization

  if (!Authenticated) {
    return response.status(401).json({
      errorCode: 'No authenticated'
    })
  }

  const [, token] = Authenticated.split(' ')

  try {
    const { sub } = verify(token, '24c2133782db42076d2b98a0cde661d4') as Isub

    request.user_id = sub

    return next()
  } catch (err) {
    return response.status(401).json({
      errorCode: 'Token expired'
    })
  }
}
