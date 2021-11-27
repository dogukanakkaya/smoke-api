import express, { Request, Response, Router } from 'express'
import { HydratedDocument } from 'mongoose'
import { Collection, ICollection } from '../../models/Collection'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const collections = await Collection.find({}).exec()

        return res.json({
            status: 1,
            collections
        })
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        })
    }
}).post('/', async (req: Request, res: Response) => {
    const { title }: ICollection = req.body;

    const collection: HydratedDocument<ICollection> = new Collection({
        title
    })

    try {
        await collection.save()

        return res.json({
            status: 1,
            collection: {
                title,
                createdAt: collection.createdAt
            }
        })
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
})

export default router