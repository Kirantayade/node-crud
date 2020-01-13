const express = require('express');
const router = express.Router();
const db = require('../database/db');
const joi = require('Joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');  

router.post('/',function(req,res,next){
    console.log(bcrypt);
    try{
    const{error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    console.log("email"+req.body.email);
    const user=db.query("SELECT * FROM users where email=$1",[req.body.email], function(error, result) {
    console.log(result.rows); 
    
        
    const validPassword = bcrypt.compareSync(req.body.password,result.rows[0].password);
    if(!validPassword) return res.status(400).send(' password not valid');   
    
    const token =jwt.sign({user_id:result.rows[0].user_id,username:result.rows[0].username},"secretkey");
    
    res.send(token);
    
    //res.send(true);
});
}
    catch(err){
        return next(err)}
    });

function validate(req){
    const schema = {
      email:joi.string().min(5).max(255).email(),
      password:joi.string().min(2).max(255).required(),
     }
    return joi.validate(req,schema);
  };

module.exports = router; 