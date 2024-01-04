console.clear();
import express  from "express";

const PORT=3000;//puerto de servicio
const App = express();//iniciacion de app en una constante.

App.use(express.json());// express.json() es un metodo que devuelve el body parseado a json, si no lo detecta valido no retornara nada
App.use(express.text());// express.text() es un metodo que devuelve el body parseado a text, si no lo detecta valido no retornara nada

App.post("/mi-cuenta",(req,res)=>{

    console.log(req.body);//el body esta parceado por express.json()
    console.log(req.query);//objeto query, contiene datos que enviamos en la url al final ej: ?hola=holamundo

    res.send("tu cuenta personal");
});

App.get("/mi-cuenta/:cuentaid",(req,res)=>{
    console.log(req.params.cuentaid);//params es un objeto que contendra los parametros especificados con : 
    res.send("tu cuenta personal");
});

App.listen(PORT,()=>{console.log(`Servidor creado en el puerto ${PORT}`);})