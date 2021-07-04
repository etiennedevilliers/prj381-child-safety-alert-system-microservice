let NoNumberplate = {
    "status":201,
    "error":"Numberplate error",
    "message":"No numberplate supplied",
    "path":"/RegisterCar"
};

let NoBody = {
    "status":201,
    "error":"Body Error",
    "message":"No body supplied",
    "path":"/RegisterCar"
};

let CarAlreadyExists = {
    "status":201,
    "error":"Numberplate error",
    "message":"Numberplate already registered",
    "path":"/RegisterCar"
};

let MailError = {
    "status":201,
    "error":"Email error",
    "message":"At least email needs to be supplied",
    "path":"/RegisterCar"
}

module.exports = {
    'NoNumberPlate' : NoNumberplate,
    'NoBody' : NoBody,
    'CarAlreadyExists': CarAlreadyExists,
    'MailError': MailError
};