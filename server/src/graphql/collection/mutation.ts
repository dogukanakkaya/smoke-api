import { GraphQLID } from 'graphql'
import { HydratedDocument } from 'mongoose'
import { Collection, ICollection } from '../../models/Collection'
import { CollectionInputType, CollectionType } from './type'

export default ({
    createCollection: {
        type: CollectionType,
        args: {
            input: { type: CollectionInputType }
        },
        resolve(_: any, { input }: { input: ICollection }) {
            const { title }: ICollection = input

            const collection: HydratedDocument<ICollection> = new Collection({
                title
            })

            return collection.save()
        }
    },
    updateCollection: {
        type: CollectionType,
        args: {
            _id: { type: GraphQLID },
            input: { type: CollectionInputType }
        },
        resolve(_: any, { _id, input }: { _id: string, input: ICollection }) {
            const { title }: ICollection = input

            return Collection.findByIdAndUpdate(_id, { title }).populate('requests')
        }
    },
    deleteCollection: {
        type: CollectionType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(_: any, { _id }: { _id: string }) {
            return Collection.findByIdAndDelete(_id)
        }
    },
})