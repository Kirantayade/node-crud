const Joi= require('joi');

class User {
    
  constructor(name,email,password,isadmin,created_on,last_login) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.created_on=created_on;
      this.last_login=last_login;
      this.Isadmin=isadmin;
    }
  };

 function validateUser(User){
    const schema = {
      name:Joi.string().min(3).max(50).required(),
      email:Joi.string().min(5).max(255).email(),
      password:Joi.string().min(2).max(255).required(),
      created_on:Joi.required(),
      last_login:Joi.optional(),
      isadmin:Joi.optional()

    }
    return Joi.validate(User,schema);
  };


exports.User = User;
exports.validateUser =validateUser;