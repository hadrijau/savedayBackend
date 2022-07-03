import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import Commande from "../models/commandeModel.js";


// @desc Get messages for a user
// @route GET /api/messages
// @access Public
const getMessages = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const messages = await Message.find({$or: [
            {sender: id},
            {receiver: id}
        ]});
    res.json(messages);
});

// @desc Create a messages for a user
// @route POST /api/messages
// @access Public
const createThread = asyncHandler(async (req, res) => {

    const { sender, receiver, latestMessage, pseudoReceiver, pseudoSender } = req.body;

    const message = Message.create({
        sender,
        receiver,
        latestMessage,
        pseudoReceiver,
        pseudoSender,
        messages: []
    });

    if (message) {
        res.status(200).json({message})
    } else {
        res.status(400).json({message: 'Une erreur est survenue'})
    }
});

// @desc Create a messages for a user
// @route POST /api/messages/thread
// @access Public
const createMessage = asyncHandler(async (req, res) => {

    const {
        id,
        messageId,
        text,
        createdAt,
        userId,
        userName,
    } = req.body;

    const thread = await Message.findById({_id: id});

    const message = {
        _id: messageId, //message_id
        text, //message_content
        createdAt, //message_creation_time
        user: {
            _id: userId, //sender_id
            name: userName, //sender_name
        }
    }

    if (thread) {
        thread.messages.push(message);
        const updatedThread = await thread.save()
        res.status(200).json({updatedThread})
    } else {
        res.status(500).json({message: 'The thread with the given ID was not found.'})
    }



    res.status(200).json({thread})
});

// @desc Get the messages for a user
// @route GET /api/messages/thread/:id
// @access Public
const getInnnerMessages = asyncHandler(async (req, res) => {

    const { id } = req.params

    const thread = await Message.findById({_id: id});

    let messages;

    if (thread.messages) {
        messages = thread.messages
        messages.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    } else {
        messages = []
    }

    res.status(200).json({messages})
});

// @desc Delete thread
// @route DELETE /api/messages/:id
// @access Private/admin
const deleteThread = asyncHandler(async (req, res) => {
    const thread = await Message.findById(req.params.id);
    if (thread) {
        await thread.remove();
        res.json({ message: "Thread removed" })
    } else {
        res.status(404)
        throw new Error("Thread not found")
    }
});

export { createThread, getMessages, createMessage, deleteThread, getInnnerMessages }
