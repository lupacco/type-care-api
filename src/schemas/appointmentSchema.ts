import JoiImport from "joi";
import DateExtension from "@hapi/joi-date";

const Joi = JoiImport.extend(DateExtension);

export const appointmentSchema = Joi.object({
  date: Joi.date().format("YYYY/MM/DD").required(),
  time: Joi.string().required(),
});
