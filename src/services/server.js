const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

const viewsFolderPath = path.resolve( __dirname, '../../views' );
const  publicFolderPath = path.resolve( __dirname, '../../public' );
const layoutsFolderPath = path.resolve( __dirname, `${viewsFolderPath}/layouts` );
const partialsFolderPath = path.resolve( __dirname, `${viewsFolderPath}/partials` );

console.log( viewsFolderPath );
console.log( publicFolderPath );

app.use( express.static(publicFolderPath) );
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsFolderPath )

app.engine( 'hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
    partialsDir: partialsFolderPath
}) )

app.post( '/', (req,res)=>{
    
    res.render( 'main');
} )


module.exports = app;