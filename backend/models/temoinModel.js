import mongoose from "mongoose";

const temoinSchema = mongoose.Schema({
    latlng: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
    description: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
});


const Temoin = mongoose.model("Temoin", temoinSchema);

export default Temoin;
