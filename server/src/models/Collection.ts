import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const CollectionSchema = new Schema<ICollection>({
    title: {
        type: String,
        required: true
    },
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }],
}, {
    timestamps: true
})

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema)

interface ICollection {
    _id: ObjectId
    title: string
    requests: ObjectId[]
    createdAt: Date
    updatedAt: Date
}

enum HTTPMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE'
}

export {
    Collection,
    ICollection
}