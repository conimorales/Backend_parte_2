// --- imports packages ---
import express from "express";
import cors from "cors";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

import socket from "./socket.js";
//import { cartsRouter } from "./routes/carts.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";

const port = process.env.PORT || 8080;

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//==== Handlebars setting ====
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

//==== Static files ====
app.use(express.static(`${__dirname}/public`));

// routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// server
const httpServer = app.listen(port, () => console.log(`listening on http://localhost:${port}`))
socket.connect(httpServer)