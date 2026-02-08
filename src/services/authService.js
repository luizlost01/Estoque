import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
export const registerUser = async (name, email, password) => {
    const userExists = await prisma.user.findUnique({where: { email } })
    if (userExists) {
        throw new Error("User Exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}

export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        throw new Error('Invalid Email or Password')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        throw new Error("Invalid Email or Password")
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: "1d"
    })

    return {user: {id: user.id, name: user.name, email: user.email }, token}
}

