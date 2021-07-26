
const genericMessage = 'Internal Server Error...!';

function errorResponseBuilder(response, errorCode, message) {
        return response.status(errorCode).send({message: !message? genericMessage: message})
}

function successResponseBuilder(response, responseCode, data) {

    return response.status(responseCode).send({data: data})
     
}


module.exports = {
    errorResponseBuilder,
    successResponseBuilder
}