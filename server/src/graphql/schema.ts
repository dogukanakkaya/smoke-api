import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql'

// Database
import { Collection } from '../models/Collection'

// Types
import { CollectionType } from './types/collection'

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        collections: {
            type: new GraphQLList(CollectionType),

            async resolve(parent, args) {
                return await Collection.find().populate('requests')
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})