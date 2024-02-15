const jwt = require("jsonwebtoken")
import { JWT_SECRET } from "../config"

export function authMiddleware (req, res, next){

    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({});
    }

    const token = authHeader.split("")[1]


    try {
        const decoded = jwt.verify(token, JWT_SECRET) 
        req.documentId = decoded.documentId
        next()

    }catch(err){
        console.log(err)
        res.status(403).json({});
    }


}