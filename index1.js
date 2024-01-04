console.clear();

import { log } from 'console';
import {createServer} from 'http'; //servidor http

const httpServer = createServer((req,res)=>{
    console.log(req.method);// se obtiene el metodo que trae la peticion, puede ser get, post put delete
    console.log(req.url);// se obtiene la ruta solicitada
    console.log(req.headers);// se obtiene las cabeceras, todo dato mandado por este metodo estara en minusculas

    //el body es una representacion abstracta llamada stream, hay que armarlo usando un evento 
    let data="";
    let chunkIndex=0;// el chunk es la data particionada que la tenemos que armar para representar los datos que nos mandan
    req.on('data',(chunk)=>{
        data += chunk;//se agrega la data a medida que hace el bucle

        chunkIndex++;
        console.log(chunkIndex);
    });//cuando reciba data a traves de stream pasamos la data, en la funcion flecha recibimos un chunk 

    req.on('end',()=>{
        //console.log(data);

        res.end("enviado");

    })//cuando la data es recibida podemos lanzar una respuesta, porque sino, no se va a procesar la data y se va a cerrar la conexion
});

httpServer.listen(3000);