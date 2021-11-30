import { GraphQLID } from 'graphql'
import { Request } from '../../models/Request'
import { RequestType } from './type'

export default ({
    request: {
        type: RequestType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(_: any, { _id }: { _id: string }) {
            return Request.findById(_id)
        }
    }
})