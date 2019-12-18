const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:@localhost:5432/fishes_app'
//const pool = new Pool({
  //connectionString: connectionString,
//})
//pool.query('SELECT NOW()', (err, res) => {
 // console.log(res);
 // pool.end()
//})
const client = new Client({
  connectionString: connectionString,
})
client.connect((err,res)=>{
    console.log('conected to db...........');
});
module.exports=client;