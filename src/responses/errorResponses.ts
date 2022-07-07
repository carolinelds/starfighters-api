export function schemaNotValid(entity: string){
    throw {
        type: "error_not_valid",
        message: `The ${entity} inserted is not a valid one`
    }
}

export function notFound(entity: string){
    throw {
        type: "error_not_found",
        message: `${entity} could not be found`
    }
}

const errorResponse = {
    schemaNotValid,
    notFound
}

export default errorResponse;