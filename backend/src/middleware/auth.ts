import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../config"

export interface CostumJwtPayload extends JwtPayload {
    documentId : string
}

export function authMiddleware (req : any,res : any ,next:any){

    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({});
    }

    const token = authHeader.split("")[1]


    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CostumJwtPayload
        req.documentId = decoded.documentId
        next()

    }catch(err){
        console.log(err)
        res.status(403).json({});
    }


}