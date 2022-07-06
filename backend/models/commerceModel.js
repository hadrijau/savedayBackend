import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const commerceSchema = mongoose.Schema({
    email: {
        unique: true,
        type: String,
    },
    description: {
        type: String
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    latlng: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
    phone: {
        type: String,
    },
    website: {
        type: String
    },
    startTimeMon: {
        type: String
    },
    startTimeTue: {
        type: String
    },
    startTimeWed: {
        type: String
    },
    startTimeThu: {
        type: String
    },
    startTimeFri: {
        type: String
    },
    startTimeSat: {
        type: String
    },
    startTimeSun: {
        type: String
    },
    endTimeMon: {
        type: String
    },
    endTimeTue: {
        type: String
    },
    endTimeWed: {
        type: String
    },
    endTimeThu: {
        type: String
    },
    endTimeFri: {
        type: String
    },
    endTimeSat: {
        type: String
    },
    endTimeSun: {
        type: String
    },
}, {
    timestamps: true
});

const Commerce = mongoose.model("Commerce", commerceSchema);

export default Commerce;
