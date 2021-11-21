import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

router.get('/test', (req: Request, res: Response) => {
    res.json({
        test: true
    })
})

export default router