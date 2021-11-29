import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const RequestSchema = new Schema<IRequest>({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    method: {
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
}, {
    timestamps: true
})

const Request = mongoose.model<IRequest>('Request', RequestSchema)

interface IRequest {
    _id: ObjectId
    title: string
    url: string
    method: HTTPMethod
    queryParams: Map<string, string>
    headers: Map<string, string>
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
    Request,
    IRequest
}