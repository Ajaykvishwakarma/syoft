const jwt = require('jsonwebtoken')
require("dotenv").config();
const verifyToken = (token)=>{
    return new Promise((respose, reject)=>{
        jwt.verify(token, `${process.env.JWT_KEY}` ,function (err,result){
            if(err)
                reject(err)
            respose(result.user)
        })
    })
}

const auth = async(req, res, next )=>{
    if(!req.headers.authorization)
        return res
        .status(402)
        .send({
            status : "failed"
        })
    if(!req.headers.authorization.startsWith('Bearer'))
        return res
        .status(402)
        .send({
            status : "failed"
        })
    const token = req.headers.authorization.split(' ')[1]
    let user 
    try {
        user = await verifyToken(token)
    } catch (error) {
        return res
        .status(500)
        .send({
            status : "failed"
        })
    }
    req.body.user = user
    next()
}
module.exports = { auth }