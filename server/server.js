const express = require('express');
const mongoose =  require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({
  //origin: 'https://theideaproject.netlify.app/',
}));

//require routes
const browse = require('./routes/browseRoutes')
const submit = require('./routes/submitRoutes')
const ideas = require('./routes/ideasRoutes')
const admin = require('./routes/adminLoginRoutes')

//Mongo atlas credentials
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

//middleware 
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//route middleware
app.use('/app/browse', browse)
app.use('/app/submit', submit)
app.use('/app/ideas', ideas)
app.use('/admin', admin)

//mongo uri and Port
const uri = `mongodb+srv://${USER_NAME}:${PASSWORD}@idea-project.sscfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000;



//connection to mongoose

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> console.log("connected to database"))
  .catch((err) => console.log(err));


//listen on PORT
app.listen(PORT, ()=> {console.log("hey, the server is up and running");

});