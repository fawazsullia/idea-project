const express = require('express');
const router = express.Router();


router.get("/", (req, res, next)=>{
    

if(req.session.cookie && req.session.userName){
    
    res.status(200).json({userName: req.session.userName, signedIn : true, userType: req.session.userType});
    next();

}
else {
    res.status(200).json({userName: "", signedIn : false, userType: "" });
    next();

}
    
})


module.exports = router