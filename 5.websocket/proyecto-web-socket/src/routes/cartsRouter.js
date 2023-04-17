// imports packages
const express = require('express')
const cartsRouter = express.Router()

const { gestionCart } = require('../admins/CartManager')




// Methods
cartsRouter.post('/', async (req, res) => {
    const path =   [ {
        "products": [
            {
                "id": 3,
                "quantity": 3
            },
            {
                "id": 1,
                "quantity": 2
            }
        ]
    },
    {
        "products": [
            {
                "id": 8,
                "quantity": 3
            },
            {
                "id": 2,
                "quantity": 2
            }
        ]
    }]


    const response = await gestionCart.createCart(path)
    res.send(response);
});


cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const product = await gestionCart.getCartId(Number(cid))
    res.send(product);
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    res.send(pid)
    console.log(cid)

    let cart = await gestionCart.getCartById(Number(cid))
    let product = await gestionProd.getProductById(Number(pid))

    const productAdd = {
        id: product.id,
        quantity: 1
    }

    gestionCart.addToCart(cart, productAdd)


    res.status(200).send('product added to cart') 
});


// exports
module.exports = {
    cartsRouter,
}

