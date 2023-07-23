import Joi from "joi"

 const contactAddChema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite:Joi.boolean().required(),

  
 })

const contactUpdateFavoriteSchema = Joi.object({
     favorite: Joi.boolean().required(),
 })

export default {
    contactAddChema,
    contactUpdateFavoriteSchema,
} 