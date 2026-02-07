import { prisma } from '../lib/prisma.js'

export const createProduct = async (data) => {
    return prisma.produtos.create({data})
}

export const getAllProducts = async () => {
    return prisma.produtos.findMany()
} 

export const updateProduct = async (id, data) => {
    return prisma.produtos.update({
        where: {id},
        data
    })
}

export const deleteProduct = async (id) => {
    return prisma.produtos.delete({
        where: {id}
    })
} 