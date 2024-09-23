import { Router } from "express";
import controller from "../controllers/clientController"

const routes = Router();

routes.post("/create", controller.createClient);
routes.get("/list", controller.listClient);
routes.delete("/delete", controller.delete);
routes.put("/updateName", controller.nameUpdate);
routes.put("/updateEmail", controller.emailUpdate);
routes.put("/updateStatus", controller.statusUpdate);

export default routes;