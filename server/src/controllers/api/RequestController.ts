import express, { Request, Response, Router } from 'express'

// Database
import { HydratedDocument } from 'mongoose'
import { Request as CollectionRequest, IRequest } from '../../models/Request'

const router: Router = express.Router()

router.get('/:_id', async (req: Request, res: Response) => {
    try {
        const request = await CollectionRequest.findById(req.params._id)

        return res.json({
            status: 1,
            request
        })
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        })
    }
}).post('/', async (req: Request, res: Response) => {
    const { title, url, method, queryParams, headers }: IRequest = req.body

    const request: HydratedDocument<IRequest> = new CollectionRequest({
        title,
        url,
        method,
        queryParams,
        headers
    })

    try {
        await request.save()

        return res.json({
            status: 1,
            request: {
                _id: request._id,
                request,
                createdAt: request.createdAt
            }
        })
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
}).put('/:_id', async (req: Request, res: Response) => {
    const { title }: IRequest = req.body

    try {
        const request = await CollectionRequest.findByIdAndUpdate(req.params._id, { title })

        if (request) {
            return res.json({
                status: 1,
                request: {
                    _id: request._id,
                    request,
                    createdAt: request.createdAt
                }
            })
        }

        throw new Error('Can\'t find request with given id.')
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
}).delete('/:_id', async (req: Request, res: Response) => {
    try {
        const request = await CollectionRequest.findByIdAndDelete(req.params._id)

        if (request) {
            return res.json({
                status: 1,
                request: {
                    _id: request._id
                }
            })
        }

        throw new Error('Can\'t find request with given id.')
    } catch (err: any) {
        return res.json({
            status: 0,
            message: err.message
        }).status(422)
    }
})

export default router