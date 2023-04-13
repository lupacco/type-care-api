import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { appointmentSchema } from "../schemas/appointmentSchema.js";
import appointmentController from "../controllers/appointmentController.js";
import { validateToken } from "../middlewares/validateToken.js";

const appointmentsRouter = Router()

appointmentsRouter.post("/appointments", validateToken, validateSchema(appointmentSchema), appointmentController.create)
appointmentsRouter.get("/appointments", validateToken, appointmentController.getFreeAppointments)
appointmentsRouter.patch("/appointments/schedule/:id", validateToken, appointmentController.schedule)
appointmentsRouter.patch("/appointments/update/:status/:id", validateToken, appointmentController.updateStatus)
appointmentsRouter.get("/appointments/scheduled", validateToken, appointmentController.getScheduledAppointments)
appointmentsRouter.get("/appointments/history", validateToken, appointmentController.getHistory)

export default appointmentsRouter