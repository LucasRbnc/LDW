import { Request, Response} from 'express';
import { Client } from '../models/client'

class ClientController {
    public async createClient(req: Request, res: Response){
        try{
            const { name,email } = req.body

            const client = new Client({name,email});
            const response = await client.save();
            res.status(201).json({message: 'Usuario cadastrado com sucesso'});
        }catch(error){
            console.error('Erro ao registrar cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor'});
        }
    }

    public async listClient(req: Request, res: Response){
        try{
            const results = await Client.find({});
            res.status(200).json(results);
        }catch(error){
            console.error('Erro ao trazer cliente', error)
        }
    }
}

export default new ClientController;