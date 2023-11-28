const jwt = require("jsonwebtoken")

const genauthToken = (user)=>{
    const secret = process.env.JWT
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    },
    secret
    )
    return token
}

module.exports = genauthToken