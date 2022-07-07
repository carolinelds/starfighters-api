import Joi from "joi";

const usersSchema: object = Joi.object({
    firstUser: Joi.string().required(),
    secondUser: Joi.string().required()
})

export default usersSchema;