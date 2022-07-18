import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true, // précaution pour supprimer l'espace
            unique: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Hash passswd
UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

//Compare passwd
UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<boolean | Error> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
