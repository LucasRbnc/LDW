import { Request, Response} from 'express';
import { Client } from '../models/client'

class ClientController {
    public async createClient(req: Request, res: Response){
        try{
            const { name,email } = req.body

            const client = new Client({name,email});
            const response = await client.save();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso', client: response });
        }catch(error){
            console.error('Erro ao registrar cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor'});
        }
    }

    public async listClient(req: Request, res: Response) {
        try {
            const results = await Client.find({});
            res.status(200).json(results);
        } catch (error) {
            console.error('Erro ao trazer cliente', error);
            res.status(500).json({ error: 'Erro ao buscar clientes' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Client.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async emailUpdate(req: Request, res: Response): Promise<void> {
        const { id, email } = req.body;
        try {
            const response = await Client.findByIdAndUpdate(
                id,
                { email },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.status(409).send({ message: `O e-mail ${email} já está em uso` });
            } else if (e.errors?.email) {
                res.status(400).send({ message: e.errors.email.message });
            } else {
                res.status(500).send({ message: "Erro no servidor" });
            }
        }
    }

    public async nameUpdate(req: Request, res: Response): Promise<void> {
        const { id, name } = req.body;
        try {
            const response = await Client.findByIdAndUpdate(
                id,
                { name },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            } else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            } else {
                res.send({ message: e });
            }
        }
    }
    public async statusUpdate(req: Request, res: Response): Promise<void> {
        const { id, status } = req.body;
        try {
            const response = await Client.findByIdAndUpdate(
                id,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            } else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            } else {
                res.send({ message: e });
            }
        }
    }
}

export default new ClientController;