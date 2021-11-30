import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import { HydratedDocument } from 'mongoose'

// Database
import { Collection, ICollection } from '../models/Collection'
import { IRequest, Request } from '../models/Request'

// Types
import { CollectionInputType, CollectionType } from './types/collection'
import { RequestInputType, RequestType } from './types/request'

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        collections: {
            type: new GraphQLList(CollectionType),
            resolve(_, args) {
                return Collection.find().populate('requests')
                //return await Collection.find()
            }
        },
        collection: {
            type: CollectionType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, { _id }) {
                return Collection.findById(_id).populate('requests')
                //return await Collection.findById(_id)
            }
        },
        request: {
            type: RequestType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, { _id }) {
                return Request.findById(_id)
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createCollection: {
            type: CollectionType,
            args: {
                input: { type: CollectionInputType }
            },
            resolve(_, args) {
                const { title }: ICollection = args.input

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
            resolve(_, args) {
                const { title }: ICollection = args.input

                return Collection.findByIdAndUpdate(args._id, { title }).populate('requests')
            }
        },
        deleteCollection: {
            type: CollectionType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return Collection.findByIdAndDelete(args._id)
            }
        },
        createRequest: {
            type: RequestType,
            args: {
                input: { type: RequestInputType }
            },
            resolve(_, args) {
                const { title, url, method, queryParams, headers }: IRequest = args.input

                const request: HydratedDocument<IRequest> = new Request({
                    title,
                    url,
                    method,
                    queryParams: queryParams ? new Map(Object.entries(queryParams)) : undefined,
                    headers: headers ? new Map(Object.entries(headers)) : undefined
                })

                return request.save()
            }
        },
        updateRequest: {
            type: RequestType,
            args: {
                _id: { type: GraphQLID },
                input: { type: RequestInputType }
            },
            resolve(_, args) {
                const { title, url, method, queryParams, headers }: IRequest = args.input

                return Request.findByIdAndUpdate(args._id, {
                    title,
                    url,
                    method,
                    queryParams: queryParams ? new Map(Object.entries(queryParams)) : undefined,
                    headers: headers ? new Map(Object.entries(headers)) : undefined
                })
            }
        },
        deleteRequest: {
            type: RequestType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return Request.findByIdAndDelete(args._id)
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})