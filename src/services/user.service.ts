import {ApiError} from "../errors";
import {User} from "../models/User.mode";
import {userRepository} from "../repositories/user.repository";
import {IUser} from "../types/user.types";

class UserService {
    public async findAll(): Promise<IUser[]> {
        try {
            return await User.find().select("-password");
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

      public async create(data: IUser): Promise<IUser> {
        return await userRepository.create(data);
    }

    public async findById(id: string): Promise<IUser> {
        return await User.findById(id);
    }
}


export const userService = new UserService();