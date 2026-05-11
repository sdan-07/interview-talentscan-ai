import mongoose, { Document, Model } from 'mongoose';

interface IBlacklist extends Document{
    token: string,
    timestamps: string
}

const blacklistSchema = new mongoose.Schema<IBlacklist>({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"]
    }
}, {
    timestamps: true
});

export const blacklistModel: Model<IBlacklist> = mongoose.model<IBlacklist>("blacklist", blacklistSchema);