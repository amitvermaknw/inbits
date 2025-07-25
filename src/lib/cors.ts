import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const allowedOrigins = ['https://inbits.co', 'https://www.inbits.co']

const cors = Cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})

type MiddlewareFn = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (err?: Error | null) => void
) => void

const runMiddleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    fn: MiddlewareFn
): Promise<void> => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) return reject(result)
            return resolve()
        })
    })
}

const applyCors = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await runMiddleware(req, res, cors)
}

export default applyCors
