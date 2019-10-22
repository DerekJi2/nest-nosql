import * as mongoose from 'mongoose';

export const SpwSchema = new mongoose.Schema({
    id: Number,
    name: String,
    sent: Number,
});
