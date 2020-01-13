const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fishRoutes = require('./routes/fishes');
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const morgan = require('morgan');
const config = require('config');
const PORT = 4008;

//if(!config.get('jwtprivatekey')){
//    console.error('FATAL ERROR:jwtprivate key is not defined');
//    process.exit(1);
//}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use('/fishes',fishRoutes);
app.use('/students',studentRoutes);
app.use('/users',userRoutes);
app.use('/api/auth',authRoutes);

//console.log('dsdyugyg');

app.use(function(req,res,next){
    let err= new Error('Not Found');
    err.status=404;
    next(err);
});
app.listen(PORT, function(){
    console.log('App Started on port:4008');
});  