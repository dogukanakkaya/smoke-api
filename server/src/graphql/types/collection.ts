import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } from 'graphql'
import { GraphQLJSON } from 'graphql-type-json'

export const RequestType = new GraphQLObjectType({
    name: 'Request',
    fields: {
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        queryParams: { type: GraphQLJSON },
        headers: { type: GraphQLJSON }
    }
})

export const CollectionType = new GraphQLObjectType({
    name: 'Collection',
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        requests: { type: new GraphQLList(RequestType) }
    }
})