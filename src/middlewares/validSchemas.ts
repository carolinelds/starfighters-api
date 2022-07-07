import { stripHtml } from "string-strip-html";
import { Request, Response, NextFunction } from "express";
import errorResponse from "./../responses/errorResponses.js";

export default function validSchema(schema: any, entity: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const body: object = req.body;
        const schemaBody: object = {};

        for (const key in body) {
            if (typeof req.body[key] === "string") {
                schemaBody[key] = stripHtml(req.body[key]).result.trim();
            } else {
                schemaBody[key] = req.body[key];
            }
        }

        //const validation = await schema.validateAsync(schemaBody, { abortEarly: false });
        const validation = await schema.validateAsync(schemaBody);

        if (validation.error) {
            //console.log(validation.error.details.map((detail) => detail.message));
            return errorResponse.schemaNotValid(entity);
        }

        res.locals.body = validation;

        next();
    }
}