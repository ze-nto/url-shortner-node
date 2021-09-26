import { URLController } from './controller/URLController';
import express from 'express';
import { MongoConnection } from './database/MongoConnection';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));
const database = new MongoConnection();
database.connect(); 

const urlController = new URLController();
api.post('/shorten', urlController.shorten)

api.get('/:hash', urlController.redirect);

api.listen(3000, () => {
    console.log("Express listening");
});
