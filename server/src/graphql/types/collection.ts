import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } from 'graphql'
import { RequestType } from './request'

export const CollectionType = new GraphQLObjectType({
    name: 'Collection',
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        requests: { type: new GraphQLList(RequestType) }
    }
})