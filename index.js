console.clear();

import express from "express";
//import 'dotenv/config'; //inicializador global, es mas facil
import dotenv from "dotenv";
import accountRouter from "./routes/account.js"; //funciona como un middleware, por eso se llamara al final de la app

dotenv.config();

const PORT = process.env.PORT || 3001;//hace referencia a la variable port en el archivo.env
const app = express();

app.use(express.json());
app.use(express.text());
app.use("/account",accountRouter);//para que el middleware no afecte a las demas rutas definimos en el use la ruta a la que se va a escuchar

app.get("/raiz",(req,res)=>{
    res.send("hola")
})



app.listen(PORT, () => { console.log(`Servidor creado en el puerto ${PORT}`); })