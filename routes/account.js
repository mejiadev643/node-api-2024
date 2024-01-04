import express  from "express";
import { BB_DD } from "../BBDD.js"

const accountRouter = express.Router();

//un middleware se encarga de manejar logica de acceso, por lo tanto puede usarse en este caso a travez de .use de express
accountRouter.use((req,res,next)=>{ // al ser un middleware, necesita el tercer parametro que es next para seguir en caso de que se valide la informacion
    //en este caso, al finalizar la logica y hacer next se pasa al siguiente middleware o endpoints
    console.log(req.ip);

    next();
})

accountRouter.get('/:guid', (req, res) => {
    const { guid } = req.params; //destructuring, se extrae unicamente el parametro que se solicita
    const user = BB_DD.find(user => user.guid === guid);
    if (!user) return res.status(404).send();

    return res.send(user);

});

accountRouter.post('', (req, res) => {
    const { guid , name } = req.body;
    if (!name || !guid) return res.status(400).send();

    const user = BB_DD.find(user => user.guid === guid);
    if (user) return res.status(409).send();
    BB_DD.push({
        guid,name
    });
    return res.send();

});

accountRouter.patch('/:guid', (req, res) => {
    const { guid } = req.params; //destructuring, se extrae unicamente el parametro que se solicita
    const { name } = req.body;
    if (!name) return res.status(400).send();

    const user = BB_DD.find(user => user.guid === guid);
    if (!user) return res.status(404).send();
    user.name = name;

    return res.send()
});

accountRouter.delete('/:guid', (req, res) => {
    const { guid } = req.params; //destructuring, se extrae unicamente el parametro que se solicita
    const userIndex = BB_DD.findIndex(user => user.guid === guid);
    if (userIndex === -1) res.status(404).send();

    BB_DD.splice(userIndex, 1);
    return res.send();


});

export default accountRouter;