const express= require('express');
const app= express();
const dotenv=require('dotenv')
dotenv.config();
const mongoose=require('mongoose')
const route= require('./routes/route');
const error = require('./middleware/error');
const cookieParser = require("cookie-parser")
const cors = require('cors')



mongoose.set('strictQuery', true); 

app.use(express.json()); 
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {console.log('MongoDB is Connected')})
  .catch((err) => {console.log(err.message)});

app.use('/', route)
app.use(cors())  

app.use(error)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});