import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import { GraphQLJSON } from 'graphql-type-json'

export const RequestType = new GraphQLObjectType({
    name: 'Request',
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        method: { type: GraphQLString },
        queryParams: { type: GraphQLJSON },
        headers: { type: GraphQLJSON }
    }
})