import { prisma } from '../lib/prisma.js'

export const createProduct = async (data) => {
    return await prisma.produtos.create({data})
}

export const getAllProducts = async () => {
    return await prisma.produtos.findMany()
} 

export const updateProduct = async (id, data) => {
    return await prisma.produtos.update({
        where: {id},
        data
    })
}

export const deleteProduct = async (id) => {
    return await prisma.produtos.delete({
        where: {id}
    })
} 