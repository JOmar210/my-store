const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);

const createCategorieSchema=Joi.object({
  name: name.required(),
});
const updateCategorieSchema=Joi.object({
  name: name,
});
const getCategorieSchema=Joi.object({
  id: id.required(),
});
module.exports={createCategorieSchema, updateCategorieSchema, getCategorieSchema}
