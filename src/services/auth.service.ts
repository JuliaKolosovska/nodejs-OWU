import {ApiError} from "../errors";
import {Token} from "../models/token.model";
import {User} from "../models/User.mode";
import {ICredentials, ITokensPair} from "../types/token.types";
import {IUser} from "../types/user.types";
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";

class AuthService {
    public async register(data: IUser): Promise<void> {
        try {
            const hashedPassword = await passwordService.hash(data.password);

            await User.create({...data, password: hashedPassword})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }

    }

    public async login(credentials: ICredentials, user: IUser): Promise<ITokensPair> {
        try {
             user=await User.findOne({email:credentials.email}).select("password");
            const isMatched = await passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new ApiError('invalid email or password', 401);
            }
            const tokensPair = await tokenService.generateTokenPair({
                _id: user._id,
            })
            await Token.create({
                ...tokensPair,
                _userId: user._id
            })
            return tokensPair;
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

export const authService = new AuthService();