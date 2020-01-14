const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied.No token provided');
    console.log(token);
    try{
    const decoded = jwt.verify(token,'secretkey');
    console.log(decoded);
    
    req.User = decoded;
    next();
    }
    catch(ex)
    {
    console.log(ex);
    //res.status(400).send('Invalid Token');

    }
}

//module.exports=authToken();