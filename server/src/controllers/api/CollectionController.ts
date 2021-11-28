import express, { Request, Response, Router } from 'express'
import { HydratedDocument, Types } from 'mongoose'
import { Collection, ICollection } from '../../models/Collection'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const collections = await Collection.find({})

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
}).get('/:_id', async (req: Request, res: Response) => {
    try {
        const collection = await Collection.findById(req.params._id)

        return res.json({
            status: 1,
            collection
        })
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        })
    }
}).post('/', async (req: Request, res: Response) => {
    const { title }: ICollection = req.body

    const collection: HydratedDocument<ICollection> = new Collection({
        title
    })

    try {
        await collection.save()

        return res.json({
            status: 1,
            collection: {
                _id: collection._id,
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
}).put('/:_id', async (req: Request, res: Response) => {
    const { title }: ICollection = req.body

    try {
        const collection = await Collection.findByIdAndUpdate(req.params._id, { title })

        if (collection) {
            return res.json({
                status: 1,
                collection: {
                    _id: collection._id,
                    title,
                    createdAt: collection.createdAt
                }
            })
        }

        throw new Error('Can\'t find collection with given id.')
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
}).delete('/:_id', async (req: Request, res: Response) => {
    try {
        const collection = await Collection.findByIdAndDelete(req.params._id)

        if (collection) {
            return res.json({
                status: 1,
                collection: {
                    _id: collection._id
                }
            })
        }

        throw new Error('Can\'t find collection with given id.')
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
})

export default router