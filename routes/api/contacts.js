import express from "express"

import {contactController} from "../../controllers/index.js"

import validateBody from "../../decorators/validateBody.js"

import contactsSchemas from "../../schemas/schemas.js"

import {isValidId} from "../../middlewares/index.js"

const router = express.Router()



router.get('/', contactController.getAll )

router.get('/:contactId',isValidId, contactController.getById)

router.post('/',validateBody(contactsSchemas.contactAddChema),contactController.add)

router.delete('/:contactId',isValidId,contactController.deleteById )

router.put('/:contactId',isValidId,validateBody(contactsSchemas.contactAddChema), contactController.updateById)

router.patch('/:contactId/favorite',isValidId,validateBody(contactsSchemas.contactUpdateFavoriteSchema), contactController.updateFavorite)

export default router
 