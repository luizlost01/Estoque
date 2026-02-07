import * as productService from '../services/productService.js'

export const create = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body || {};

        if (!name || !category || price === undefined || quantity === undefined) {
            return res.status(400).json({
                error: "Missing required fields: name, category, price, quantity",
            });
        }

        const product = await productService.createProduct({ name, category, price, quantity });
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const list = async (req, res) => {
    const { name, category, price, quantity } = req.query || {};
    let products = await productService.getAllProducts();

    if (name || category || price !== undefined || quantity !== undefined) {
        const priceNumber = price !== undefined ? Number(price) : undefined;
        const quantityNumber = quantity !== undefined ? Number(quantity) : undefined;

        products = products.filter((product) => {
            if (name && product.name !== name) {
                return false;
            }
            if (category && product.category !== category) {
                return false;
            }
            if (price !== undefined && !Number.isNaN(priceNumber)) {
                if (product.price !== priceNumber) {
                    return false;
                }
            }
            if (quantity !== undefined && !Number.isNaN(quantityNumber)) {
                if (product.quantity !== quantityNumber) {
                    return false;
                }
            }
            return true;
        });
    }

    return res.status(200).json(products);
}


export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, category, price, quantity } = req.body || {}
        if (!name || !category || price == undefined || quantity == undefined) {
            return res.status(400).json({
                error: "Missing Required Fields: name, category, price, quantity"
            })
        }

        const updateProduct = await productService.updateProduct(id, {
            name,
            category,
            price,
            quantity
        })
        return res.status(200).json(updateProduct)

    } catch (error) {
        return res.status(500).json({ error: "ID Not Found" })
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params
        await productService.deleteProduct(id)
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({
            error: "Delete Product Error"
        })
    }
}