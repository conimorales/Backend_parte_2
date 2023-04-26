// --- imports packages ---
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import dotenv from "dotenv";

import socket from "./socket.js";
import __dirname from "./utils.js";

//6TTso4IUVf6Z1V61

// mongodb+srv://constanzamoralesa:<password>@prueba.kie7tvb.mongodb.net/test

import messagesRouter from "./routes/messages.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";


dotenv.config();


const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//==== Static files ====
app.use(express.static(`${__dirname}/public`));

//==== Handlebars setting ====
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const port = process.env.PORT || 8080;

mongoose.connect(
    `mongodb+srv://constanzamoralesa:6TTso4IUVf6Z1V61@prueba.kie7tvb.mongodb.net/prueba?retryWrites=true&w=majority`
);


// routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use("/api/messages", messagesRouter);

// server
const httpServer = app.listen(port, () => console.log(`listening on http://localhost:${port}`))
socket.connect(httpServer)