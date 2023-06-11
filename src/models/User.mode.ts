import {Schema, model} from 'mongoose';
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
        enum: EGenders
    },
    email: {
        type: String,
        required: true,
        trim:true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true
    }
})

export const User=model('user', userSchema)