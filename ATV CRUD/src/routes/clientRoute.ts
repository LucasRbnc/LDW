import { Router } from "express";
import controller from "../controllers/clientController"

const routes = Router();

routes.post("/create", controller.createClient);
routes.get("/list", controller.listClient);

export default routes;