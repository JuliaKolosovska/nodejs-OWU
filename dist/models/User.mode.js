"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_enum_1 = require("../enums/user.enum");
const userSchema = new mongoose_1.Schema({
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
        enum: user_enum_1.EGenders
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
    }
});
exports.User = (0, mongoose_1.model)('user', userSchema);
