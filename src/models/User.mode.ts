import {Schema, model} from 'mongoose';
import { EUserStatus } from '../enums/user-status.enum';
import { EGenders } from '../enums/user.enum';



const userSchema = new Schema({

    name: {
        type: String
    },
    age: {
        type: Number,
        min: [1, 'Minimum 1 year'],
        max: [199, 'Maximum 199 years']
    },
    gender: {
        type: String,
        default: EUserStatus.Inactive,
        enum: EUserStatus
    },
    status: {
        type: String,
        enum: EGenders
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isActivated: {
        type: Boolean,
        default: false
    },
},
{
    versionKey: false,
        timestamps: true,
}
)

export const User=model('user', userSchema)