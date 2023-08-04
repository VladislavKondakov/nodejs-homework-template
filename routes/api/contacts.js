import express from "express"

import {contactController} from "../../controllers/index.js"

import validateBody from "../../decorators/validateBody.js"

import contactsSchemas from "../../schemas/schemas.js"

import {isValidId,authenticate,upload} from "../../middlewares/index.js"

const router = express.Router()

router.use(authenticate)

router.get('/', contactController.getAll )

router.get('/:contactId',authenticate,isValidId, contactController.getById)

router.post('/',upload.single("avatar"),validateBody(contactsSchemas.contactAddSchema),contactController.add)

router.delete('/:contactId',isValidId,contactController.deleteById )

router.put('/:contactId',isValidId,validateBody(contactsSchemas.contactAddSchema), contactController.updateById)

router.patch('/:contactId/favorite',isValidId,validateBody(contactsSchemas.contactUpdateFavoriteSchema), contactController.updateFavorite)

export default router
 