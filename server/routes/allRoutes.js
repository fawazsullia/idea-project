const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{

if(!req.session.userID){
    res.json({userName: "", signedIn : false, userType: "" }).end()
}
else {

res.status(200).json({userName: req.session.userName, signedIn : true, userType: req.session.userType})

}
    
})


module.exports = router