import { JWT_SECRET } from '../config'
import { Request } from 'express'

// Security
import passport from 'passport'
import PassportJwt from 'passport-jwt'

const cookieExtractor = (req: Request) => {
    return req?.cookies?.access_token ?? null;
}

passport.use(new PassportJwt.Strategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET!
}, (jwtPayload, done) => {
    return done(null, jwtPayload)
}))

export default passport.authenticate('jwt', { session: false })
