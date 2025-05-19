import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import logger from './middlewares/logger'
import { config } from './config/config'
import passport from 'passport'
import passportJwt from './config/passport-jwt'
import rateLimiter from './middlewares/rateLimiter'
import routes from './routes'
import { notFoundHandler, errorHandler } from './middlewares/errorHandler'

const app = express()

//=======Middlewares======//
if (config.NODE_ENV !== 'production') {
  app.use(
    morgan('dev', {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  )
}

app.use(
  cors({
    origin: config.ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders:
      'Accept, Accept-Language, X-Requested-With, Content-Language, Content-Type, Origin, Authorization, x-paystack-signature, x-forwarded-for',
    optionsSuccessStatus: 200,
    credentials: true,
  })
)

app.use(helmet())
app.use(rateLimiter)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

passport.use('jwt', passportJwt())
app.use(passport.initialize())

//=======Routes========//
app.get('/', (req, res) => {
  res.json({ message: 'Server running' })
})
app.use('/api', routes)

//=======Error Handler=======//
app.use(notFoundHandler)
app.use(errorHandler)

//=======........========//
const PORT = config.PORT

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
