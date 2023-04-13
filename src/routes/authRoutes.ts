import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";
import userController from "../controllers/userController.js";
import patientController from "../controllers/patientController.js";
import doctorController from "../controllers/doctorController.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchema(userSchema),
  userController.create,
  patientController.create,
  doctorController.create
);

authRouter.post("/signin", userController.signIn)

export default authRouter;
