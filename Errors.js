let NoNumberplate = {
    "status":201,
    "error":"Numberplate error",
    "message":"No numberplate supplied",
};

let NoBody = {
    "status":201,
    "error":"Body Error",
    "message":"No body supplied",
};

let InternalServerError = {
    "status":401,
    "error":"Internal Server Error",
    "message":"An internal server error has occured",
}

let CarAlreadyExists = {
    "status":201,
    "error":"Numberplate error",
    "message":"Numberplate already registered",
};

let MailError = {
    "status":201,
    "error":"Email error",
    "message":"At least email needs to be supplied",
}

module.exports = {
    'NoNumberPlate' : NoNumberplate,
    'NoBody' : NoBody,
    'CarAlreadyExists': CarAlreadyExists,
    'MailError': MailError
};