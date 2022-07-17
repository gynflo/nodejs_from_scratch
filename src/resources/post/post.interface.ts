import { Document } from 'mongoose';

export default interface Post extends Document {
    _id?: string;
    title: string;
    body: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}
