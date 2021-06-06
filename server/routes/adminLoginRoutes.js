const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AdminUsers = require('../schemas/adminUsersSchema');
const saltRounds = 10;



router.post('/login', async (req, res)=>{
try{
    const { userName, password} = req.body;
    const data = await AdminUsers.findOne({ userName: userName }, 'userName hash')
    
    if(data){
    const match = await bcrypt.compare(password, data.hash);
    if(match){
        res.status(200).json({userName: userName, signedIn : true })
    }
    else { res.status(500).json({message: "Your username or password doesn't match"})}

    }
    else { res.status(500).json({message: "Your username or password doesn't match"})}
    
    
    res.end();
}
catch(err){
    console.log(err);
}
});

//signup route (no front end for now)

router.post('/signup', async (req,res)=>{
try{
    const { userName, password} = req.body;
    const hash = await bcrypt.hash(password, saltRounds)

    const adminUser = new AdminUsers({
        userName : userName,
        hash : hash
    });
    
   //await adminUser.save();
   await res.status(200).json({message: "sent"}).end()
}
catch(err){
    console.log(err)
}

})




module.exports = router