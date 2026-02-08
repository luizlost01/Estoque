import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const protect = (req,res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({Error: "Token Not Found"})
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoder = jwt.verify(token, JWT_SECRET)
        req.userId = decoder.id

        return next()
    } catch (error) {
        res.status(401).json({error: "Token Not Found or Invalid"})
    } 
}