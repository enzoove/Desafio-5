const dataDinamica ={
    Products: [
        {
            nombre: 'Notebook',
            precio: 200,
            thumbnail: 'https://cdn.icon-icons.com/icons2/444/PNG/256/Notebook_HP_Compaq_6910p_43264.png'
        },
        {
            nombre: 'Celular',
            precio: 150,
            thumbnail: 'https://cdn.icon-icons.com/icons2/54/PNG/256/phonein_telefono_10881.png'
        },
        {
            nombre: 'Monitor',
            precio: 120,
            thumbnail: 'https://cdn.icon-icons.com/icons2/570/PNG/512/mac_icon-icons.com_54610.png'
        }
        ],
        mostrar: true
}

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

const viewsFolderPath = path.resolve( __dirname, '../../views' );
const  publicFolderPath = path.resolve( __dirname, '../../public' );
const layoutsFolderPath = path.resolve( __dirname, `${viewsFolderPath}/layouts` );
const defaultLayoutPath = path.resolve( __dirname, `${layoutsFolderPath}/index.hbs` );
const partialsFolderPath = path.resolve( __dirname, `${viewsFolderPath}/partials` );

console.log( viewsFolderPath );
console.log( publicFolderPath );

app.use( express.static(publicFolderPath) );
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsFolderPath )
app.use( express.urlencoded( {extended: true} ) );

app.engine( 'hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
    defaultLayout: defaultLayoutPath,
    partialsDir: partialsFolderPath
}) )



app.get( '/', (req,res)=>{
    res.render( 'main', dataDinamica);
} )

app.post( '/', (req,res)=>{

    const newProduct_form = req.body;
    
   const newProduct = req.body;
    console.log(newProduct);
    dataDinamica.Products.push( newProduct );
} )

app.get( '/productos',(req,res)=>{
    res.render( 'productos', dataDinamica );
} )


module.exports = app;