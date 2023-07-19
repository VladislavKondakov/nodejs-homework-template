import HttpError from "../helpers/HttpError.js";


const validateBody = contactAddChema => {
    const func = (req, res, next) => {
        const { error } = contactAddChema.validate(req.body)
    if (error) {
      throw HttpError(400,error.message)
        }
        next()
    }
    return func
}

export default validateBody