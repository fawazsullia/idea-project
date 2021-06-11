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

//dashboard get

router.post('/dashboard', async (req, res)=> {
try{
const receivedId = req.body.id;

await IdeaDetails.deleteOne({_id : receivedId })
await res.send("Deleted").end()
}
catch(err){
    res.status(500).send("Couldn't connect to server").end()
}

})

//dashboard put

router.put('/dashboard', async (req, res)=> {
try{
const receivedId = req.body.id;
await IdeaDetails.updateOne({_id : receivedId}, { isValidated : true } )
await res.status(200).send("updated").end()
}
catch(err){
    res.status(500).send("Couldn't connect to server").end()

}
})


module.exports = router