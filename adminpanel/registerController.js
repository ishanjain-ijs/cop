const User = require('../models/users')
// const User = db.users
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {  fullName, username, password} = req.body;
    if (!fullName|| !username || !password) return res.status(400).json({ 'message': 'All fields are required.' });


    try {
        
        const hashedPwd = await bcrypt.hash(password, 10);        
        const result = await User.create({
            "fullName": fullName,
            "username": username,
            "password": hashedPwd,
     
        })
        .then(result => {
            // console.log(result)
            res.status(201).json({ 'success': `New user ${fullName} created!` , result});
        })
        .catch(err => {
            console.log(err)
        })
        
    } 
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };