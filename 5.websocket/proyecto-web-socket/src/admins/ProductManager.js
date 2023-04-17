
const fs = require("fs");

const path = './Products.json'


class ProductManager {
    constructor(path){
        this.path = path;
    }

    async validateExisteFile () {
        try{
            await fs.promises.stat(path)
        }catch(error){
            await fs.promises.writeFile(path, JSON.stringify([]));
        }
    }  

    async guardarProductos (productos){
        try{        
        const data = JSON.stringify(productos, null, '\t')
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
                dict.title = analys[i]['title']
                dict.description = analys[i]['description']
                dict.code = analys[i]['code']
                dict.price = analys[i]['price']
                dict.status = analys[i]['status']
                dict.stock = analys[i]['stock']
                dict.thumbnail = analys[i]['thumbnail']
                
                
                arr_products.push(dict)
            }
            return arr_products
        

        } catch (error) {
            console.error('Error: no se encontraron productos en el archivo')
            throw new Error(error)
        }
    


    async getProductById (idBuscado){
        try{
            const productos = await this.getAll();
            const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado );
        
            if(indice < 0) {
                throw new Error('El producto no existe');
            }
        
            return productos[indice];
        }catch(error){
            console.log("Problema con el producto solicitado")
        }
    }

    async AddProduct(data) {
        let arr_add = []
        arr_add.push(data)

        const productos = await this.getAll();
        let id = 1;

        if(productos.length){	//Si tengo elementos en mi array
            id = productos[productos.length -1].id + 1;
        }
        let dict = {}
        let revisa_error_1 = []
        let revisa_error_2 = []
        for (let i = 0; i<arr_add.length; i++){
            if (arr_add[i]['title']==null ||arr_add[i]['description']==null || arr_add[i]['price']== null || arr_add[i]['thumbnail']== null || 
            arr_add[i]['code']== null || arr_add[i]['stock']== null || typeof data.price !== 'number' ){
                revisa_error_1.push('Datos Inválidos')
            }
            for (let j = 0; j<productos.length; j++){
                if (productos[j]['title'] == arr_add[i]['title'] || productos[j]['code'] == arr_add[i]['code'] ){
                    revisa_error_2.push('Datos Inválidos')
                }               
            }
        }

        if (revisa_error_1[0] == 'Datos Inválidos' || revisa_error_2[0] == 'Datos Inválidos'){
            console.log('Datos Inválidos')
        } 

        else{
            for (let i = 0; i<arr_add.length; i++){

                dict.id = id
                dict.title = arr_add[i]['title']
                dict.description = arr_add[i]['description']
                dict.code = arr_add[i]['code']
                dict.price = arr_add[i]['price']
                dict.status = arr_add[i]['status']
                dict.stock = arr_add[i]['stock']
                dict.category = arr_add[i]['category']
                dict.thumbnail = arr_add[i]['thumbnail']
                
            }

            productos.push(dict);
            await this.guardarProductos(productos);
        }
    }
    
    async deleteAll(){
        try{
            await this.guardarProductos([]);
        }catch(error){
            console.log("problemas para eliminar todos los productos")
        }
    }
    
    async deleteById(idBuscado){
        try{
            //console.log("idbuscado",idBuscado)//
            const productos = await this.getAll();
        
            const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado );
            
            if(indice < 0) {
                return error
            }
            else{
                productos.splice(indice, 1);
                await this.guardarProductos(productos);
            }
        }catch(error)
        {
            console.log("Error")
        }
    } 



    async updateProduct(idBuscado, productUpdated){
        const productos = await this.getAll();
        const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado );
        if(indice < 0) {
            console.log('El producto no existe')
        }
        else{
            const productUpdate= [productUpdated]
            for (let i = 0; i < productos.length; ++i) {
                if (productos[i]['id'] === idBuscado) {
                    productos[i]['title'] = productUpdate[0]['title'];
                    productos[i]['description'] = productUpdate[0]['description'];
                    productos[i]['code'] = productUpdate[0]['code'];
                    productos[i]['price'] = productUpdate[0]['price'];
                    productos[i]['status'] = productUpdate[0]['status'];
                    productos[i]['stock'] = productUpdate[0]['stock'];
                    productos[i]['thumbnail'] = productUpdate[0]['thumbnail'];
                }
            }
            
            await this.guardarProductos(productos);
        }
    }

}

const gestionProd = new ProductManager(path)

// exports
module.exports = {
    gestionProd
}