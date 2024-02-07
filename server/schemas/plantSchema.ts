// server/schemas/plantSchema.ts

import Joi from 'joi';

const plantSchema = Joi.object({
  _id: Joi.string().optional(),
  name: Joi.string().required(),
  species: Joi.string().required(),
  // Define additional fields as needed
});

export default plantSchema;