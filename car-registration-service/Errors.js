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

module.exports = {
    'NoNumberPlate' : NoNumberplate,
    'NoBody' : NoBody
};