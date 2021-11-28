import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const RequestsSchema = new Schema<IRequest>({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    queryParams: {
        type: Map,
        of: String
    },
    headers: {
        type: Map,
        of: String
    }
})

const CollectionSchema = new Schema<ICollection>({
    title: {
        type: String,
        required: true
    },
    requests: [RequestsSchema],
}, {
    timestamps: true
})

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema)

interface ICollection {
    _id: ObjectId
    title: string
    requests: IRequest[]
    createdAt: Date
    updatedAt: Date
}

interface IRequest {
    title: string
    url: string
    queryParams: Map<string, string>
    headers: Map<string, string>
}

export {
    Collection,
    ICollection
}