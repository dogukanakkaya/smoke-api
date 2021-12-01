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


export const CreateRequestInputType = new GraphQLInputObjectType({
    name: 'CreateRequestInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        method: { type: new GraphQLNonNull(GraphQLString) },
        queryParams: { type: GraphQLJSON },
        headers: { type: GraphQLJSON }
    }
})

export const UpdateRequestInputType = new GraphQLInputObjectType({
    name: 'UpdateRequestInput',
    fields: {
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        method: { type: GraphQLString },
        queryParams: { type: GraphQLJSON },
        headers: { type: GraphQLJSON }
    }
})