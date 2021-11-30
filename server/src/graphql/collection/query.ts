import { GraphQLList, GraphQLID } from 'graphql'
import { Collection } from '../../models/Collection'
import { CollectionType } from './type'

export default ({
    collections: {
        type: new GraphQLList(CollectionType),
        resolve() {
            return Collection.find().populate('requests')
        }
    },
    collection: {
        type: CollectionType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(_: any, { _id }: { _id: string }) {
            return Collection.findById(_id).populate('requests')
        }
    }
})