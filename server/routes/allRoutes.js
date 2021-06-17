const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{
    

if(req.sessionID && req.session.user){
    res.status(200).json({userName: req.session.user.userName, signedIn : true, userType: req.session.user.userType})

}
else {
    res.status(200).json({userName: "", signedIn : false, userType: "" })

}
    
})


module.exports = router