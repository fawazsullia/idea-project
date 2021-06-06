const express = require('express');
const router = express.Router();
const IdeaDetails = require('../schemas/ideaDetailsSchema');

//get ideas on /app/browse route in multiples of 16

router.get("/", async(req, res)=>{
try{
    
const currentCount = parseInt(req.query.count)

const ideas = await IdeaDetails.find({ taken : false, isValidated : true }, 'id title', {limit : currentCount}).sort({created_at : -1})
    res.status(200).json(ideas).end()
}
catch(err){
    console.log(err)
}
    });

module.exports = router    




