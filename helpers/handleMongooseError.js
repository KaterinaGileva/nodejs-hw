//const isConflict = ({name, code}) => 
//(name === "MongoServerError" && code === 11000);

//const handleSchemaValidationError = (error, data, next) => {
    
  //  error.status = isConflict(error) ? 409 : 400;
 //  next();
//}

 // module.exports = handleSchemaValidationError;

 const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next()
};

module.exports = handleMongooseError;