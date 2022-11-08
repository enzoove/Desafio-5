const express = require('express');
const MainRouter = require('../routes/index')
const { engine }= require( 'express-handlebars' );
const path = require('path');

const app = express();

const viewsFolderPath = path.resolve( __dirname, '../../views' );
const layoutsFolderPath = path.resolve( __dirname,`${viewsFolderPath}/layouts` );
const defaultLayoutPath = path.resolve( __dirname, `${layoutsFolderPath}/index.handlebars` )

app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );
app.use( express.static('public') ); 

app.set('view engine', 'handlebars');
app.set('views',viewsFolderPath);
app.engine('handlebars', engine({
    //config de handlebars
    layoutsDir: layoutsFolderPath,
    defaultLayout: defaultLayoutPath
}) )

app.use( '/api', MainRouter );

module.exports = app;
