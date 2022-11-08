const { Router } = require('express');
const ProductosRouter = require('./productos')
const rutaPrincipal = Router();

rutaPrincipal.use( '/productos', ProductosRouter );

rutaPrincipal.get( '/', (req,res)=>{
    res.render('main');
} )




module.exports = rutaPrincipal;
