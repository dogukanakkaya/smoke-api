import { JWT_SECRET } from '../config'
import express, { Request, Response, Router } from 'express'

// Security
import passport from 'passport'
import PassportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Database
import { HydratedDocument } from 'mongoose'
import { IUser, User } from '../models/User'

const router: Router = express.Router()

passport.use(new PassportLocal.Strategy({ usernameField: 'email' }, async (email, password, done) => {
    const user: IUser | null = await User.findOne({ email }).exec()

    if (!user) {
        return done({ message: 'Wrong credentials' }, false)
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
        return done({ message: 'Wrong credentials' }, false)
    }

    done(null, {
        firstName: user.firstName,
        lastName: user.lastName,
        email
    })
}))

router.post('/login', (req: Request, res: Response) => {
    passport.authenticate('local', (err, user) => {
        if (!user) {
            return res.json({
                status: 0,
                message: err.message
            }).status(401)
        }

        const token = jwt.sign({
            ...user,
            iss: 'localhost'
        }, JWT_SECRET!, { expiresIn: '2h' })

        return res.cookie('access_token', token, { httpOnly: true, secure: true }).json({
            status: 1,
            user
        })
    })(req, res)
})

router.post('/register', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: IUser = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user: HydratedDocument<IUser> = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    try {
        await user.save()

        return res.json({
            status: 1,
            user: {
                firstName,
                lastName,
                email
            }
        })
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    return res.json({ status: 1 }).clearCookie('access_token')
})

export default router