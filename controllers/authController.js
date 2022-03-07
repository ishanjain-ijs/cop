const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await User.findOne({where: {username: username} });
    if (!foundUser) return res.sendStatus(401); 
    
    // const match = await bcrypt.compare(password, foundUser.password);
    if (foundUser.password === password) {
        
  
        const accessToken = jwt.sign(
            {
                    "username": foundUser.username,
                    "userid": foundUser.id
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2h' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username, "userid": foundUser.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure: true,  maxAge: 24 * 60 * 60 * 1000 }); //
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };