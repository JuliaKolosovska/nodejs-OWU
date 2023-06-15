import { User } from "../models/User.mode";
import { IUser } from "../types/user.types";

class UserRepository {
    public async create(data: IUser): Promise<IUser> {
        return await User.create(data);
    }
}

export const userRepository = new UserRepository();