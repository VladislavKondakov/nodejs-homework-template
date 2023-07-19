import express from "express"

import contactController from "../../controllers/contact-controller.js"

import validateBody from "../../decorators/validateBody.js"

import contactAddChema from "../../schemas/schemas.js"



const router = express.Router()



router.get('/', contactController.getAll )

router.get('/:contactId', contactController.getById)

router.post('/',validateBody(contactAddChema),contactController.add)

router.delete('/:contactId',contactController.deleteById )

router.put('/:contactId',validateBody(contactAddChema), contactController.updateById)

export default router
 