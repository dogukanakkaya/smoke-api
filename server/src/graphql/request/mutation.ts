import { GraphQLID } from 'graphql'
import { HydratedDocument } from 'mongoose'
import { IRequest, Request } from '../../models/Request'
import { CreateRequestInputType, UpdateRequestInputType, RequestType } from './type'

export default ({
    createRequest: {
        type: RequestType,
        args: {
            input: { type: CreateRequestInputType }
        },
        resolve(_: any, { input }: { input: IRequest }) {
            const { title, url, method, queryParams, headers }: IRequest = input

            const request: HydratedDocument<IRequest> = new Request({
                title,
                url,
                method,
                queryParams: queryParams ? new Map(Object.entries(queryParams)) : undefined,
                headers: headers ? new Map(Object.entries(headers)) : undefined
            })

            return request.save()
        }
    },
    updateRequest: {
        type: RequestType,
        args: {
            _id: { type: GraphQLID },
            input: { type: UpdateRequestInputType }
        },
        resolve(_: any, { _id, input }: { _id: string, input: IRequest }) {
            const { title, url, method, queryParams, headers }: IRequest = input

            return Request.findByIdAndUpdate(_id, {
                title,
                url,
                method,
                queryParams: queryParams ? new Map(Object.entries(queryParams)) : undefined,
                headers: headers ? new Map(Object.entries(headers)) : undefined
            })
        }
    },
    deleteRequest: {
        type: RequestType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(_: any, { _id }: { _id: string }) {
            return Request.findByIdAndDelete(_id)
        }
    }
})