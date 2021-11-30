import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
import { RequestType } from '../request/type'

export const CollectionType = new GraphQLObjectType({
    name: 'Collection',
    fields: {
        _id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        requests: { type: new GraphQLList(RequestType) }
        // Reason to use mongoose's relations is performance 
        /*
        requests: {
            type: new GraphQLList(RequestType),
            resolve(parent) {
                return Request.find({
                    _id: {
                        $in: parent.requests
                    }
                })
                console.log(parent);

            }
        }
        */
    }
})

export const CollectionInputType = new GraphQLInputObjectType({
    name: 'CollectionInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
    }
})