import HttpError from "../helpers/HttpError.js";
import contactsService from "../models/contacts.js"

import { ctrlWrapper } from "../decorators/index.js";


const getAll = async (req, res, next) => {
  
  const result = await contactsService.listContacts()
    res.json(result)
  
}

const getById = async (req, res, next) => {
  
    const { contactId } = req.params
    const result = await contactsService.getContactById(contactId)
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`)
    
    
    }
    res.json(result)
}

const add = async (req, res, next) => {
  
    
   const result = await contactsService.addContact(req.body)
    res.status(201).json(result)
  
  
  
}

const deleteById= async (req, res, next) => {
  
    const { contactId } = req.params
    const result = await contactsService.removeContact(contactId)
    if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    res.json({
      message: "Delete success"
    })
  
  
}

const  updateById =  async (req, res, next) => {
  
    
    
    const {contactId} = req.params
    const result = await contactsService.updateContact(contactId, req.body)
     if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    res.json(result)
  
 
}

export default {
    getAll: ctrlWrapper(getAll),
    getById:ctrlWrapper(getById),
    add:ctrlWrapper(add),
    deleteById:ctrlWrapper(deleteById),
    updateById:ctrlWrapper(updateById),
}