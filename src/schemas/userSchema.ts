import Joi from "joi";

export const userSchema = Joi.object({
    type: Joi.string().required().valid('doctor', 'patient'),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    cpf: Joi.alternatives().conditional('type', { is: 'patient', then: Joi.string().required(), otherwise: Joi.forbidden() }),
    crm: Joi.alternatives().conditional('type', { is: 'doctor', then: Joi.string().required(), otherwise: Joi.forbidden()}),
    speciality: Joi.alternatives().conditional('type', { is: 'doctor', then: Joi.string().required(), otherwise: Joi.forbidden() }),
  });