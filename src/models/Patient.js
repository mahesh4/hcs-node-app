import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
    'Program Identifier': {
        type: String,
        required: true,
    },
    'Data Source': {
        type: String,
        required: false
    },
    'Card Number': {
        type: String,
        required: false,
    },
    'Member ID': {
        type: String,
        required: false,
    },
    'First Name': {
        type: String,
        required: false,
    },
    'Last Name': {
        type: String,
        required: false,
    },
    'Date of Birth': {
        type: String,
        required: false
    },
    'Address 1': {
        type: String,
        required: false
    },
    'Address 2': {
        type: String,
        required: false
    },
    City: {
        type: String,
        required: false
    },
    State: {
        type: String,
        required: false
    },
    'Zip code': {
        type: String,
        required: false
    },
    'Telephone number': {
        type: String,
        required: false
    },
    'Email Address': {
        type: String,
        required: false
    },
    CONSENT: {
        type: String,
        required: false
    },
    'Mobile Phone': {
        type: String,
        required: false
    }
});

export default patientSchema
