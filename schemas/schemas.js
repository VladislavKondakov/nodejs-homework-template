import Joi from "joi"

 const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite:Joi.boolean().required(),

  
 })

const contactUpdateFavoriteSchema = Joi.object({
     favorite: Joi.boolean().required(),
 })

export default {
    contactAddSchema,
    contactUpdateFavoriteSchema,
} 