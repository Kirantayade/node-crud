const express=require('express');
const app = express();
const bodyParser=require('body-parser');
const fishRoutes= require('./routes/fishes');
const studentRoutes= require('./routes/student');
const morgan = require('morgan');
const PORT=4008;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use('/fishes',fishRoutes);
app.use('/students',studentRoutes);
//console.log('dsdyugyg');

app.use(function(req,res,next){
    let err= new Error('Not Found');
    err.status=404;
    next(err);
});
app.listen(PORT, function(){
    console.log('App Started on port:4008');
}
);  