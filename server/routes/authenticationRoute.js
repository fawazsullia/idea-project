const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../schemas/usersSchema');
const saltRounds = 10;

//login post
router.post('/login', async (req, res)=>{

    const { userName, password} = req.body;

    try{

    const data = await Users.findOne({ userName: userName }, 'userName hash _id userType')

    if(data){
    const match = await bcrypt.compare(password, data.hash);

    if(match){
        req.session.user = {
            userName : data.userName,
            userID : data._id, 
            userType : data.userType
        }

        res.status(200).json({userName: data.userName, signedIn : true, userType: data.userType }).end();
    }
    else { res.status(403).json({message: "Your username or password doesn't match"}).end()}

    }
    else { res.status(403).json({message: "User does not exist. Please register"}).end()}
    
}
catch(err){
    console.log(err);
}
});


//signup post
router.post('/signup', async (req,res)=>{
    try{
        const { userName, password} = req.body;
        const hash = await bcrypt.hash(password, saltRounds)
    
        const user = new Users({
            userName : userName,
            hash : hash,
            userType : "admin"
        });
        
       await user.save();
       await res.status(200).json({message: "sent"}).end()
    }
    catch(err){
        console.log(err)
    }
    
    });




module.exports = router