import {Contact} from "../models/index.js";

import {HttpError} from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import fs from "fs/promises"

import path from "path"


const getAll = async (req, res) => {
  
    const { _id: owner } = req.user
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1 ) * limit
  const result = await Contact.find({owner},{skip, limit}).populate("owner","name email")
    res.json(result)
  
}

const getById = async (req, res) => {
  
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`)
    
    
    }
    res.json(result)
}

const avatarsPath = path.resolve("public","avatars")

const add = async (req, res) => {
    
    const { _id: owner } = req.user
    const {path: oldpath,filename} = req.file
    const newPath = path.join(avatarsPath, filename)
    await fs.rename(oldpath, newPath)
    const avatar = path.join("avatars", filename);
   const result = await Contact.create({...req.body, avatar,owner})
    res.status(201).json(result)
  
}

const deleteById= async (req, res, next) => {
  
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    res.json({
      message: "Delete success"
    })
  
  
}

const  updateById =  async (req, res, ) => {
  
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId,req.body,{new: true})
     if (!result) {
     throw HttpError(404,`Movie with id=${contactId} not found`)
    }
    res.json(result)
  
 
}

const  updateFavorite =  async (req, res, ) => {
  
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId,req.body,{new: true})
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
    updateById: ctrlWrapper(updateById),
    updateFavorite:ctrlWrapper(updateFavorite)
}