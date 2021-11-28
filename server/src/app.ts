import env from 'dotenv'; env.config()
import { PORT } from './config'
import express, { Application } from 'express'
import { graphqlHTTP } from 'express-graphql'

// Controllers
import AuthController from './controllers/AuthController'
import BaseApiController from './controllers/api/BaseController'

// Middlewares
import JwtMiddleware from './middlewares/JwtMiddleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'

// Database
import './db'

// GraphQL
import schema from './graphql/schema'

const app: Application = express()

// Use app middlewares
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}))
app.use(express.json())
app.use(passport.initialize())
app.use(cookieParser())
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

// Define routes
app.use('/auth', AuthController)
app.use('/api', JwtMiddleware, BaseApiController)

app.listen(PORT || 8000, () => console.log(`Listening: http://127.0.0.1:${PORT || 8000}`))

export default app