import mongoose, { ObjectId } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

const { Schema } = mongoose

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model<IUser>('User', UserSchema)

interface IUser {
    _id: ObjectId
    firstName: string
    lastName: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export {
    User,
    IUser
}