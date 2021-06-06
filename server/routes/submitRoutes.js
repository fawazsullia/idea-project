const express = require('express');
const router = express.Router();

const IdeaDetails = require('../schemas/ideaDetailsSchema');


 router.post("/", async (req, res)=> {

try{

//get data from request body

const {title, description, name, email, social, taken} = req.body;

//New document in mongo atlas

const idea = new IdeaDetails({
    title : title,
    description : description,
    name : name,
    email : email,
    social : social,
    taken : false,
    isValidated : false,
    created_at : new Date
});

  await idea.save();
  await res.status(200).end()
}


catch(err){
res.status(500).json({error: err, message: "Couldn't save at this moment"}).end();
}

    })

    module.exports = router;