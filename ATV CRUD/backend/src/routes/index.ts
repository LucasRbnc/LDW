import { Router } from "express";
import clientRoutes from "./clientRoute";

const routes = Router();

routes.use("/client", clientRoutes);

export default routes;