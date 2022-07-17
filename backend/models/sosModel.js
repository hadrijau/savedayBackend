import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const sosSchema = mongoose.Schema({
    latlng: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
}, {
    timestamps: true
});


const Sos = mongoose.model("Sos", sosSchema);

export default Sos;
