import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
    {
        sender: String, //sender_id
        receiver: String,
        latestMessage: String,
        pseudoReceiver: String,
        pseudoSender: String,//receiver_id
        messages: [
            {
                _id: String, //message_id
                text: String, //message_content
                createdAt: String, //message_creation_time
                user: {
                    _id: String, //sender_id
                    name: String, //sender_name
                    avatar: String //sender_photo
                }
            }
        ]
    },
    {
        strict: false //There may be some problems in type casting. So disable strict mode.
    }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
