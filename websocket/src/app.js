// --- imports packages ---
import * as express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";

// imports routes
const {cartsRouter} = require('./routes/cartsRouter')
const {productsRouter} = require('./routes/productsRouter')

const port = process.env.PORT || 8080;

//const express = require('express')
const app = express()
//const cors = require('cors')



// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//==== Handlebars setting ====
app.engine('handlebars', handlebars.engine())
app.set('views', `${_dirname}/views`)
app.set('view engine', 'handlebars')


//==== Static files ====
app.use(express.static(`${_dirname}/public`));

// routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// server
const httpServer = app.listen(port, () => console.log(`listening on http://localhost:${port}`))
socket.connect(httpServer)