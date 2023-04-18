import express from "express";
import fs from "fs"

const viewsRouter = express.Router()

viewsRouter.get('/', async (req, res) => {
    let products = []
    try{
    const data = await fs.promises.readFile('./Products.json')
    products = JSON.parse(data)
    }catch(err){
        console.log(err)
    }

    res.render('home', { products })
})

viewsRouter.get('/realTimeProducts', async (req, res) => {
    let products = []
    try{
        const data = await fs.promises.readFile('./Products.json')
        products = JSON.parse(data)
    }catch(err){
        console.log(err)
    }
    
    res.render('realTimeProducts',{products})
})

export default viewsRouter