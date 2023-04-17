

const fs = require("fs");


const path = './Carts.json'


class CartManager {
    constructor(path){
        this.path = path;
    }

    async #readFileCarts() {
        try {
            const content = await fsPromises.readFile(path, 'utf-8')
            const contentParse = JSON.parse(content)
            return contentParse
        } catch (error) {
            console.error('Error: failed to read file')
            throw new Error(error)
        }
    }

    async validateExisteFile () {
        try{
            await fs.promises.stat(path)
        }catch(error){
            await fs.promises.writeFile(path, JSON.stringify([]));
        }
    }  

    async guardarCarts (carts){
        try{        
        const data = JSON.stringify(carts, null, '\t')
        console.log(data)
        await fs.promises.writeFile(this.path, data)
        }catch(error){
            console.log("error00000")
        }
    };


    async getAll() {
        const data = await fs.promises.readFile(path, 'utf-8')
        let analys = JSON.parse(data)
            let array_products = []
            let arr_products = []
            
            for (let i = 0; i<analys.length; i++){
                analys[i]['id']= i
                array_products.push(analys[i]) 
            }

            for (let i = 0; i<array_products.length; i++){
                let dict = {}
                dict.id = analys[i]['id']
                dict.title = analys[i]['products']
                arr_products.push(dict)
            }
            return arr_products
        

        } catch (error) {
            console.error('Error: no se encontraron productos en el archivo')
            throw new Error(error)
        }
    


    async getCartId (idBuscado){
        try{
            const cart = await this.getAll();
            const indice = cart.findIndex((cart) => cart.id === idBuscado );
        
            if(indice < 0) {
                throw new Error('El id en el carrito no existe');
            }
        
            return cart[indice];
        }catch(error){
            console.log("Error")
        }
    }

    async createCart(data) {
        let analys = data
        let array_products = []
        let arr_products = []

        
        for (let i = 0; i<analys.length; i++){
            analys[i]['id']= i
            array_products.push(analys[i]) 
        }

        for (let i = 0; i<array_products.length; i++){
            let dict = {}
            dict.id = analys[i]['id']
            dict.products = analys[i]['products']          
            
            arr_products.push(dict)
        }
        await this.guardarCarts(arr_products);
    }
    async addToCart(cart, product) {
        const fileContent = await this.#readFileCarts()
        // agregar el producto al carrito
        try {
                let cartFoundIndex = fileContent.findIndex((c) => c.id === cart.id)
                let productFoundIndex = fileContent[cartFoundIndex].products.findIndex((p) => p.id === product.id)
                let productNotExist = true
                if(fileContent[cartFoundIndex].products[productFoundIndex]) {
                    fileContent[cartFoundIndex].products[productFoundIndex].quantity = fileContent[cartFoundIndex].products[productFoundIndex].quantity + 1
                    this.writeFileCarts(fileContent) // ver si puedo poner un solo writeFile al final de los if
                    console.log('se aumenta el valor quantity')
                } else if(productNotExist) {
                    fileContent[cartFoundIndex].products.push(product)
                    this.writeFileCarts(fileContent)
                    console.log('product added to cart')
                    console.log('sea agreaga un product al array')   
                }
                console.log('afuera de los if')

            } catch (error) {
                console.error(`Error: product not added to cart with ${cart.id}`)
                throw new Error(error)
            }
    }
 

}

const gestionCart = new CartManager(path)



module.exports = {
    gestionCart
}


