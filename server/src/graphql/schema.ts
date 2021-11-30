import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import CollectionQuery from './collection/query'
import CollectionMutation from './collection/mutation'

import RequestQuery from './request/query'
import RequestMutation from './request/mutation'

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...CollectionQuery,
        ...RequestQuery
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        ...CollectionMutation,
        ...RequestMutation
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})