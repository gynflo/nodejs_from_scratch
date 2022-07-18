import { Document } from "mongoose";

export default interface User extends Document {
    _id?: string,
    email: string,
    username: string,
    password: string,
    role: string,

    isValidPassword(password: string):Promise<boolean | Error>;
}


