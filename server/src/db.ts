import { MONGO_CONNECTION_STRING } from './config'
import mongoose from 'mongoose'

mongoose.connect(MONGO_CONNECTION_STRING!)
mongoose.Schema.Types.String.set('trim', true)