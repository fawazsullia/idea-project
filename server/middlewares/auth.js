function authentication(req, res, next){

    if(!req.session){
        req.json({loggedin: false}).end();
    }
    else if(req.session.userType === "admin"){
        res.json({userName : req.session.userName, loggedin: true, userType: req.session.userType}).end()
    } else {
        res.json({userName : req.session.userName, loggedin: true, userType: req.session.userType}).end()
    }
next();
}

