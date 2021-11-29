import { JWT_SECRET } from '../../config'
import express, { Request, Response, Router } from 'express'

// Security
import jwt, { JwtPayload } from 'jsonwebtoken'

// Controllers
import UserController from './UserController'
import CollectionController from './CollectionController'
import RequestController from './RequestController'

const router: Router = express.Router()

router.get('/me', (req: Request, res: Response) => {
    try {
        const decoded: JwtPayload = jwt.verify(req.cookies.access_token, JWT_SECRET!) as JwtPayload

        return res.json({
            status: 1,
            user: {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email
            }
        })
    } catch (err) {
        return res.json({ status: 0 }).clearCookie('access_token').status(403)
    }
})

router.use('/user', UserController)
router.use('/collection', CollectionController)
router.use('/request', RequestController)

export default router