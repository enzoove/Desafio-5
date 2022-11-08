const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const { Router } = require('express');

const filePath = path.resolve( __dirname,'../../productos.json' );
console.log( filePath );

class Contenedor
{
    constructor( fileName )
    {
        this.fileName = fileName;
    }
    async getAll()
    {
        try
        {
            const content = await fs.promises.readFile( this.fileName, 'utf-8' );
            const arrayProducts = JSON.parse( content );
            return arrayProducts;
        }catch(err)
        {
            console.error(err);
        }
    }
    async addProduct( newProduct )
    {
        try
        {
            const content = await fs.promises.readFile( this.fileName, 'utf-8' );
            const arrayProducts = JSON.parse( content );
            arrayProducts.push( newProduct );
            const data = JSON.stringify( arrayProducts, null,'\t' );
            await fs.promises.writeFile( this.fileName, data );
        }catch(err)
        {
            console.error(err);
        }
    }
}
const container = new Contenedor( filePath );

const rutaProductos = Router();

rutaProductos.get( '/', async( req,res )=>{

    const arrayProducts = await container.getAll();
    const dataDinamica ={
        Products: arrayProducts,
        mostrar: true
    }
    res.render('productos', dataDinamica);
} )

rutaProductos.post( '/', async( req,res )=>{
    const arrayProducts = await container.getAll();
    
    const newData = req.body;
    const { title, price, thumbnail } = req.body;
    
    if( !title || !price || !thumbnail )
    {
        return res.status(400).json( {error: `Campos invalidos.`} )
    }

    const newProduct ={
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: arrayProducts[arrayProducts.length-1].id+1
    }

    // Verifico que el producto no este repetido
    let estaRepetido = false;
    arrayProducts.forEach( (product)=>{
        if( product.title == title )
        {
            estaRepetido = true;
            return res.status(400).json( {error: `Ya existe un producto con el nombre ${title}`} );
        }
    } )

    if( !estaRepetido )
    {
        container.addProduct( newProduct );
        res.json( newProduct );
    }

} )


module.exports = rutaProductos;
