const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // console.log(req, "req")
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // const token = authHeader.split(' ')[1];
    // jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded) => {
    //         if (err) return res.sendStatus(403); 
    //         req.user = decoded.UserInfo.username;
            
    //         next();
    //     }
    // );
    try{
        var token = req.headers.authorization.split(" ")[1];
        var decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = decode.username
        next();
    }catch(error){
        res.status(401).json({
            error:"Invalid Token"
        })
    }
}


module.exports = verifyJWT