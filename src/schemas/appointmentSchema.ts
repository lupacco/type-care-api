import Joi from "joi";

export const appointmentSchema = Joi.object({
  date: Joi.date().required(),
  time: Joi.string().required(),
});
