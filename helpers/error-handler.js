function errorHandler(err,req,res,next){
    if(err.name = 'UnauthorizedError'){
        //jswt auth err
       return res.status(401).json({message:'The user is not authorized'})
    }

    if(err.name === 'ValidationError'){
       // validation err
        return  res.status(401).json({message:err})
    }
     
      // default to 500 server error 
    return res.status(500).json(err)
}

module.exports = errorHandler;