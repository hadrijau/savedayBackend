import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    userId: {
        type: String,
    }
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
