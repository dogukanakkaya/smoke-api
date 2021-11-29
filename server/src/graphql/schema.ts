import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql'

// Database
import { Collection } from '../models/Collection'
import { Request } from '../models/Request'

// Types
import { CollectionType } from './types/collection'
import { RequestType } from './types/request'

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        collections: {
            type: new GraphQLList(CollectionType),
            async resolve(parent, args) {
                return await Collection.find().populate('requests')
            }
        },
        collection: {
            type: CollectionType,
            args: {
                _id: { type: GraphQLID }
            },
            async resolve(parent, { _id }) {
                return await Collection.findById(_id).populate('requests')
            }
        },
        request: {
            type: RequestType,
            args: {
                _id: { type: GraphQLID }
            },
            async resolve(parent, { _id }) {
                return await Request.findById(_id)
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})