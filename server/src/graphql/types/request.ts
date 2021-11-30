import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql'
import { GraphQLJSON } from 'graphql-type-json'

export const RequestType = new GraphQLObjectType({
    name: 'Request',
    fields: {
        _id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        method: { type: new GraphQLNonNull(GraphQLString) },
        queryParams: { type: GraphQLJSON },
        headers: { type: GraphQLJSON }
    }
})


export const RequestInputType = new GraphQLInputObjectType({
    name: 'RequestInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        method: { type: new GraphQLNonNull(GraphQLString) },
        queryParams: { type: GraphQLJSON },
        headers: { type: GraphQLJSON }
    }
})