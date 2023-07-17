import express from "express"

import contactAddChema from "../../schemas/schemas.js"

import HttpError from "../../helpers/HttpError.js"

import contactsService from "../../models/contacts.js"

const router = express.Router()



router.get('/', async (req, res, next) => {
  try {
  const result = await contactsService.listContacts()
    res.json(result)
  }
  catch(error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId} = req.params
    const result = await contactsService.getContactById(contactId)
    if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    
    res.json(result)
  }
  catch(error) {
      next(error)
    
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddChema.validate(req.body)
    if (error) {
      throw HttpError(400,error.message)
    }
   const result = await contactsService.addContact(req.body)
    res.status(201).json(result)
  }
  catch(error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsService.removeContact(contactId)
    if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    res.json({
      message: "Delete success"
    })
  }
  catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  
    try {
    const { error } = contactAddChema.validate(req.body)
    if (error) {
      throw HttpError(400,error.message)
    }
    const {contactId} = req.params
    const result = await contactsService.updateContact(contactId, req.body)
     if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    res.json(result)
  }
  catch(error) {
    next(error)
  }
})

export default router
 