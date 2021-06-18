const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{
    

if(req.session.cookie && req.session.userName){
    console.log("hit here")
    console.log(req.session)
    res.status(200).json({userName: req.session.userName, signedIn : true, userType: req.session.userType})

}
else {
    res.status(200).json({userName: "", signedIn : false, userType: "" })

}
    
})


module.exports = router