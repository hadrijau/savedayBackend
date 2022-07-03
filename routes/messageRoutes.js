import express from "express";

import {
    createMessage,
    createThread,
    deleteThread,
    getInnnerMessages,
    getMessages
} from "../controllers/messageController.js";

const router = express.Router();

router.route('/').post(createThread);
router.route('/thread').post(createMessage);
router.route('/thread/:id').get(getInnnerMessages);
router.route('/:id').delete(deleteThread).get(getMessages);

export default router;
