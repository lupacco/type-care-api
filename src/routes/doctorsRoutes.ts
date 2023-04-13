import { Router } from "express";
import doctorController from "../controllers/doctorController.js";
import { validateToken } from "../middlewares/validateToken.js";

const doctorsRouter = Router();

doctorsRouter.get("/doctors/name", validateToken, doctorController.findByName);
doctorsRouter.get("/doctors/speciality", validateToken, doctorController.findBySpeciality);

export default doctorsRouter;
