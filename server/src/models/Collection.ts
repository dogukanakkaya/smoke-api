import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const CollectionSchema = new Schema<ICollection>({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema)

interface ICollection {
    _id: ObjectId
    title: string
    createdAt: Date
    updatedAt: Date
}

export {
    Collection,
    ICollection
}