//import { compare } from './C:/Users/K/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bcrypt';

const bcrypt = require('bcrypt');

async function run(){
const salt = await bcrypt.genSalt();
const hashed = await bcrypt.hash('1234',salt);
console.log(salt);
console.log("kiran"+hashed);
}

run();