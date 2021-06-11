const express = require('express');
const mongoose =  require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { v4: uuidv4  } = require('uuid');

//Mongo atlas credentials
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

//mongo uri and Port
const uri = `mongodb+srv://${USER_NAME}:${PASSWORD}@idea-project.sscfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000;



const store = new MongoDBStore({
  uri: uri,
  collection: 'mySessions'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(cors());


app.use(session({
  genid : () => {  uuidv4()  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true },
 store : store,
 name : "ideaprojectuserlogin",
 cookie : {
   maxAge : 7 * 24 * 60 * 60 * 1000,
   domain : "localhost"
 }
}))




app.use(express.json())

//require routes
const browse = require('./routes/browseRoutes')
const submit = require('./routes/submitRoutes')
const ideas = require('./routes/ideasRoutes')
const admin = require('./routes/adminDashRoutes')
const auth = require('./routes/authenticationRoute')
const allRoutes = require('./routes/allRoutes')



//middleware 
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//route middleware


app.use('/', allRoutes)
app.use('/app/browse', browse)
app.use('/app/submit', submit)
app.use('/app/ideas', ideas)
app.use('/admin', admin)
app.use('/auth', auth)



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