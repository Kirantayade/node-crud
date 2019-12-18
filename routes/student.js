const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.get("/", async function(req,res,next){
  try{
    console.log('before query....');
    //console.log(db);
      const result= await db.query("SELECT * FROM students", function(error, result) {
          return res.json(result.rows);
      });       
  }  
  catch(err){
      return next(err);
  }
});

router.get("/:id", async function(req,res,next){
    try{
      console.log('before query....');
      console.log(db);
      console.log(`QUERY RESULT1:${req.params.id}`);
        const result= await db.query("SELECT * FROM fishes where id=$1",[req.params.id], function(error, result) {
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

        //console.log(req.body);
        //console.log(req.body.name);
        //console.log(req.body.schoolname);
      const result = await db.query(
        "INSERT INTO fishes (id,name,schoolname) VALUES ($1,$2,$3) RETURNING *",
        [req.body.id,req.body.name, req.body.schoolname]
      );
      return res.json(result.rows[0]);
    } catch (err) {
      return next(err);
    }
  });

 
  router.put("/:id", async function(req, res, next) {
    try {
      const result = await db.query(
        "UPDATE fishes SET name=$1, schoolname=$2 WHERE id=$3 RETURNING *",
        [req.body.name, req.body.schoolname, req.params.id]
      );
      return res.json(result.rows[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.delete("/:id", async function(req, res, next) {
    try {
      const result = await db.query("DELETE FROM fishes WHERE id=$1", [
        req.params.id
      ]);
      return res.json({ message: "Deleted" });
    } catch (err) {
      return next(err);
    }
  });


module.exports =router;