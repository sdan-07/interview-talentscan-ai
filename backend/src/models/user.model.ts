import mongoose, { Document, Model } from "mongoose"

interface IUser extends Document{
    username: string,
    password: string,
    email: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        unique: [true, "Username already taken"],
        required: true,
    },

    password: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: true
    }
})

export const userModel: Model<IUser> = mongoose.model<IUser>("users", userSchema);
