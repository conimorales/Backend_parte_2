
const express = require('express')
const productsRouter = express.Router()

const { gestionProd } = require('../admins/ProductManager')

// Methods
productsRouter.get('/', async (req, res) => {
    const products = await gestionProd.getAll()
    const limit = req.query.limit
    let respuesta = products;

    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit)
    }
    res.send(respuesta);
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await gestionProd.getProductById(Number(pid))
    res.send(product);
});

productsRouter.post('/', async (req, res) => {

    const product = {
        title: String(req.query.title),
        description: String(req.query.description),
        code: String(req.query.code),
        price: Number(req.query.price),
        status: true,
        stock: Number(req.query.stock),
        category: String(req.query.category),
        thumbnail: [req.query.thumbnail]
    } 
    if (req.query.title === ''  || req.query.description === '' || req.query.code === '' || req.query.price === '' || req.query.stock === ''  || req.query.category === ''  ){
        res.send('Error no completaste un campo')
    }
    else{
        const response = await gestionProd.AddProduct(product)
        res.send(response);
    }


    
});

productsRouter.put('/:pid', async (req, res) => {

    const { pid } = req.params;
    const productUpdated = {
        title: String(req.body.title),
        description: String(req.body.description),
        code: String(req.body.code),
        price: Number(req.body.price),
        status: Boolean(true),
        stock: Number(req.body.stock),
        category: String(req.body.category),
        thumbnail: [req.body.thumbnail]
    }

    if (req.body.title === ''  || req.body.description === '' || req.body.code === '' || req.body.price === '' || req.body.stock === ''  || req.body.category === ''  ){
        res.send('Error no completaste un campo')
    }
    else{
        data = await gestionProd.updateProduct(Number(pid), productUpdated)
        res.send(data)
    
    }



})

productsRouter.delete('/:pid', (req, res) => {
    const { pid } = req.params
    response = gestionProd.deleteById(Number(pid))
    res.send(response)
})

// exports
module.exports = {
    productsRouter,
}