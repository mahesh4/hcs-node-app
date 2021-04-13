import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema({
    
    Name: {
        type: String,
        required: true
    },
    scheduled_date: {
        type: Date,
        required: true
    }
});

export default emailSchema