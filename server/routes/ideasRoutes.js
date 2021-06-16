const express = require('express');
const router = express.Router();
const IdeaDetails = require('../schemas/ideaDetailsSchema');
const UserDetails = require('../schemas/userDetailsSchema');
const sendEmail = require('../sendEmail')

///gets the idea details by id from the url

router.get('/:id', async (req, res)=> {

    let id = req.params.id;

   const data = await IdeaDetails.findById(id);

await res.status(200).json(data).end();


})


//post route to mark an idea as taken and set username and email for corresponding idea id

router.post('/:id', async (req, res)=>{

try{
let id = req.params.id;


let data = await IdeaDetails.findById(id);

if(data.taken){
    await res.json({message: "Shoot. Someone took it just now!"})
}

else {

await IdeaDetails.findByIdAndUpdate(id, { $set: { taken: true }}, {useFindAndModify: true})

//new instance of UserDetails.

const userDetails = new UserDetails({
    name : req.body.name,
    email: req.body.email,
    idea_id: id
})

//message to send to email. This message is temperory and will be changed to html
const message = `Hey. Thank You for picking an idea. We wish you all the best in implementing the idea.
                    Details about idea ; 
                    Title: ${req.body.title}
                    Description: ${req.body.description} `

                    
//save user Details

await userDetails.save()

//send confirmation email
await sendEmail(req.body.email, message)


await res.status(200).json({message : "Congrats! You can now start working on the idea. Check mail for the details"}).end()
}}
catch(err){
res.status(500).json({message: "Couldn't save data at this moment"});
console.log(err);
}

})



module.exports = router