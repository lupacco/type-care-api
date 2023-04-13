import { Router } from "express";
import authRouter from "./authRoutes.js";
import doctorsRouter from "./doctorsRoutes.js";
import appointmentsRouter from "./appointmentsRoutes.js";

const routes = Router();

routes.use([authRouter, doctorsRouter, appointmentsRouter]);

export default routes;
