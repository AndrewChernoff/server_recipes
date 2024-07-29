import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";



export const checkAuth = (req: Request<{userId: string}>, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/^Bearer\s?/, '');

 if (token) {
    try {
        const decoded: any = jwt.verify(token, 'secret')
        
        req.params.userId = decoded.userId
        
        next()
        
    } catch (error) {
        return res.status(403).json({
            message: 'No access'
        })
    }
 }

}