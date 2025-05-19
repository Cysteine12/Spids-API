import { Request } from 'express'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { config } from './config'
import { authService } from '../services'

export default () => {
  const cookieExtractor = (req: Request) => {
    let token = req.cookies?.accessToken
    return token
  }

  return new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.jwt.ACCESS_TOKEN_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await authService.findUser({
          id: payload.sub,
          role: payload.role,
        })
        if (!user) return done(null, false)

        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
}
