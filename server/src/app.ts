import env from 'dotenv'; env.config()
import { PORT } from './config'
import express, { Application } from 'express'

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

const app: Application = express()

// Use app middlewares
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}))
app.use(express.json())
app.use(passport.initialize())
app.use(cookieParser())

// Define routes
app.use('/auth', AuthController)
app.use('/api', JwtMiddleware, BaseApiController)

app.listen(PORT || 8000, () => console.log(`Listening: http://127.0.0.1:${PORT || 8000}`))

export default app