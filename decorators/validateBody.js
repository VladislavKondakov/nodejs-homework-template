import HttpError from "../helpers/HttpError.js";


const validateBody = contactAddSchema  => {
    const func = (req, res, next) => {
        const { error } = contactAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400,error.message)
        }
        next()
    }
    return func
}

export default validateBody