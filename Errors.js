let NoNumberplate = {
    "status":400,
    "error":"Numberplate error",
    "message":"No numberplate supplied",
};

let NoBody = {
    "status":400,
    "error":"Body Error",
    "message":"No body supplied",
};

let NoJWTSupplied = {
    "status":401,
    "error":"Missing JWT",
    "message":"JWT not supplied",
}

let InvalidToken = {
    "status":401,
    "error":"Token Invalid",
    "message":"Invalid Token Supplied",
}

let InternalServerError = {
    "status":500,
    "error":"Internal Server Error",
    "message":"An internal server error has occured",
}

let EmailSendError = {
    "status":500,
    "error":"Email send failure",
    "message":"Failed to send email",
}

let CarAlreadyExists = {
    "status":400,
    "error":"Numberplate error",
    "message":"Numberplate already registered",
};

let MailError = {
    "status":400,
    "error":"Email error",
    "message":"At least email needs to be supplied",
}

let TokenIDNotSupplied = {
    "status":400,
    "error":"No Token ID",
    "message":"No token ID supplied",
}

module.exports = {
    'NoNumberPlate' : NoNumberplate,
    'NoBody' : NoBody,
    'CarAlreadyExists': CarAlreadyExists,
    'MailError': MailError,
    'InvalidToken':InvalidToken,
    'NoJWTSupplied':NoJWTSupplied,
    'EmailSendError':EmailSendError,
    'InternalServerError':InternalServerError,
    'TokenIDNotSupplied': TokenIDNotSupplied
};