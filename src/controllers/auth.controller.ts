import {Request, Response, NextFunction} from 'express'
import { authService } from '../services/auth.service';

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction){

        try{
            await authService.register(req.body);
            return res.sendStatus(201);
        }catch(e){
            next(e);
        }
    }
};

export const authController = new AuthController();