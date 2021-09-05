const express = require('express');
const router = express.Router();
const IdeaDetails = require('../schemas/ideaDetailsSchema')


//dashboard get

router.get('/dashboard', async (req, res)=> {
try{
const idea = await IdeaDetails.find({isValidated : false}, '_id title description email name')

await res.status(200).json(idea).end();
}
catch(err){
    res.status(500).json({message: "Not found"}).end()
}
});

//delete the submitted idea

router.delete(`/dashboard/:id`, async (req, res)=> {
try{
const path = req.path;
const receivedId = path.replace('/dashboard/', '')

await IdeaDetails.findByIdAndDelete(receivedId)
await res.status(200).json({message : "deleted", status : "success"}).end()
}
catch(err){
    res.status(500).send("Couldn't connect to server").end()
}

})


//dashboard put approve

router.put('/dashboard', async (req, res)=> {
try{
const receivedId = req.body.id;
console.log(receivedId)
await IdeaDetails.findByIdAndUpdate(receivedId, { isValidated : true }, { new : false  } )
await res.status(200).json({ messge : "updated", status : "success"}).end()
}
catch(err){
    res.status(500).send("Couldn't connect to server").end()

}
})


module.exports = router