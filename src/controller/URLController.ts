import { config } from '../config/Constants';
import { Request, Response } from 'express';
import shortid from 'shortid';
import { URLModel } from '../database/model/URL';

export class URLController{

    public async shorten(req: Request, res: Response): Promise<void>{

        const { originURL } = req.body;

        const url = await URLModel.findOne({ originURL });
        if(url) {
            res.json(url);
            return
        }

        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        const newURL = await URLModel.create({ originURL, hash, shortURL });
        res.json(newURL);
    }

    public async redirect(req: Request, res: Response): Promise<void>{

        const { hash } = req.params;

        const URL = await URLModel.findOne({ hash });

        if(URL) {
            res.redirect(URL.originURL);
            return
        }

        res.status(404).json({ error: 'URL not found' })




    }
}