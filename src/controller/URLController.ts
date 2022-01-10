import { Request, response, Response } from 'express';
import ShortId from 'shortid';
import { config } from "../config/Constants";
import { URLModel } from "../database/model/URL";

export class URLController{
    public async shorten(req:Request, res:Response): Promise<void>{
        //ver se a URL já não existe
        

        const { originURL } = req.body        //
        const url = await URLModel.findOne({ originURL})
      
      
        if(url){
            response.json(url)
            return
        }        
        //usamos aqui após instalar npm install --save shortid         
        const hash = ShortId.generate()
        //aqui já conseguimos encurtar uma URL
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({ hash, shortURL, originURL })
        //Salvar a URL no Banco
        //Retornar a URL que a gente salvou
        res.json(newURL)
    }

    public async redirect(req:Request, res:Response): Promise<void> {
        //Pegaremos o hash da URL
        const { hash } = req.params;
        //Encontrar a URL original pelo hash

        const url = await URLModel.findOne({ hash });
        
        if(url){
            res.redirect(url.originURL)
            return
        }
        
        /* const url = {
            originURL: "mongodb+srv://diegocar448:<password>@cluster0.3ql7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            hash: "CMYdLvdtO",
            shortURL: " http://localhost:5000/CMYdLvdtO "
        } */
        //Redirecionar para a URL original a partir do que encontramos no DB
        //res.redirect(url.originURL);

        res.status(400).json({ error: "URL not found" })

    }
}