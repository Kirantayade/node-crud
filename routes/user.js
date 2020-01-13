const bcrypt=require('bcrypt');
const express = require("express");
const router = express.Router();
const db = require("../database/db");
const authorize =require("../middleware/authToken");
const {User,validateUser} = require("../models/user");
const _=require('lodash');

const jwt = require('jsonwebtoken');
const config = require('config');
//import User from ("../models/user");

router.get("/", async function(req,res,next){
  try{
    console.log('before query....');
    //console.log(db);
    //console.log(db);
    
        await db.query("SELECT * FROM users", function(error, result) {
          return res.json(result.rows);
      });       
  }  
  catch(err){
      return next(err);
  }
});

router.get("/:id", async function(req,res,next){
    try{
      //console.log('before query....');
      //console.log(db);
      //console.log(`QUERY RESULT1:${req.params.id}`);
      const result= await db.query("SELECT * FROM user where id=$1",[req.params.id], function(error, result) {
      console.log(`QUERY RESULT:${result.rows}`);
      
      return res.json(result.rows);

      });       
    }  
    catch(err){
        return next(err);
    }
  });
  

  router.post("/", async function(req, res, next) {
    try {

      var User =_.pick(req.body,['name','email','password','isadmin','created_on']);
      const {error}=validateUser(User);
      if(error) {
        return res.status(400).send(error.details[0].message);
      }
      else{
        console.log("Valid User");
      }
      const salt = await bcrypt.genSalt();
      User.password = await bcrypt.hash(User.password,salt);

      const result = await db.query(
        "INSERT INTO users (username,email,password,created_on,isadmin) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [User.name,User.email,User.password,User.created_on,User.isadmin]
      );

      
      const token =jwt.sign({user_id:result.rows[0].user_id,username:result.rows[0].username},"secretkey");
      
      res.header('x-auth-token',token).send(_.pick(User,['name','email']));
      //return res.json(result.rows[0]);
    
    } 
    catch (err) {
      return next(err);
    }
  });

  router.put("/:id", async function(req, res, next) {
    try {
      const result = await db.query(
        "UPDATE user SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *",
        [req.body.name, req.body.email, req.body.password,req.params.id]
      );
      return res.json(result.rows[0]);
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id",authorize(), async function(req, res, next) {
    try {
      const result = await db.query("DELETE FROM users WHERE email=$1", [
        req.params.email
      ]);
      return res.json({ message: "Deleted" });
    } catch (err) {
      return next(err);
    }
  });


module.exports =router;